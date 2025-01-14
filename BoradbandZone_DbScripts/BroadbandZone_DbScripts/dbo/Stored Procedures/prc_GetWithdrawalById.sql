﻿
CREATE PROCEDURE [dbo].[prc_GetWithdrawalById]
	@prWithdrawalId INT,
	@prIsAdmin BIT
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID)

	BEGIN TRY
		SELECT w.* ,
			   PayTo = CASE WHEN ISNULL(a.CompanyName, '') <> ''  THEN  a.CompanyName ELSE a.Fullname END,
			   a.Nric,
			   a.Email,
		       a.BankName,
			   a.BankAccNo,
			   AllowEdit = CAST(CASE WHEN @prIsAdmin = 0  THEN 0 ELSE 1 END AS BIT),
			   AllowTerminate = CAST(CASE WHEN w.Status = 'Pending' THEN 1 ELSE 0 END AS BIT)			                    
		FROM Withdrawal w
		INNER JOIN Agent a ON w.Agent = a.UserLogin
		WHERE WithdrawalId = @prWithdrawalId
	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END