﻿CREATE PROCEDURE [dbo].[prc_GetAgents]
	@prCurrentPage INT,
	@prPageSize INT,
	@prSortColumn VARCHAR(50),
	@prSortInAsc BIT,
	@prSearchKeyword VARCHAR(150) = '',
	@prRecordStatus BIT,
	@oTotalRecord INT OUTPUT

AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID),
			@vSelectQuery NVARCHAR(MAX)

	DECLARE @var_Table TABLE(
		AgentId INT,
		Fullname VARCHAR(50),
		CompanyName VARCHAR(50),
		MobileNo VARCHAR(15),
		TelNo  VARCHAR(15),
		IsActive BIT,
		SuperiorName VARCHAR(50),
		CreatedOn SMALLDATETIME,
		RowNum INT
	)

	BEGIN TRY
		IF OBJECT_ID('tempdb..##temp_Table') IS NOT NULL DROP TABLE ##temp_Table

		-- get row from and row to based on current page
		SELECT @vSelectQuery =  dbo.fn_GenerateDynamicQuery(@prCurrentPage, @prPageSize, @prSortColumn, @prSortInAsc)

		SELECT a1.AgentId
			  ,a1.Fullname
			  ,a1.CompanyName
			  ,a1.MobileNo
			  ,a1.TelNo
			  ,a1.IsActive
			  ,SuperiorName = CASE WHEN NOT a1.SuperiorId IS NULL THEN a2.Fullname ELSE NULL END
			  ,a1.CreatedOn
		INTO ##temp_Table
		FROM Agent a1
		LEFT JOIN Agent a2 ON a1.SuperiorId = a2.AgentId
		WHERE 1 = CASE WHEN ISNULL(@prSearchKeyword,'') = ''  THEN 1
					   WHEN a1.Fullname LIKE @prSearchKeyword + '%' OR
					        a2.Fullname LIKE @prSearchKeyword + '%' THEN 1
					   ELSE 0
				  END
		AND 1 = CASE WHEN @prRecordStatus IS NULL THEN 1
					 WHEN a1.IsActive = ISNULL(@prRecordStatus,0) THEN 1
					 ELSE 0
				END

		PRINT @vSelectQuery

		-- insert the dynamic query results into temp table
		INSERT INTO @var_Table
		EXEC SP_ExecuteSQL @vSelectQuery


		SELECT AgentId,
				Fullname,
				CompanyName,
				MobileNo,
				TelNo,
				IsActive,
				SuperiorName
		FROM  @var_Table

		SELECT @oTotalRecord = COUNT(AgentId) FROM @var_Table

		DROP TABLE  ##temp_Table

	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END