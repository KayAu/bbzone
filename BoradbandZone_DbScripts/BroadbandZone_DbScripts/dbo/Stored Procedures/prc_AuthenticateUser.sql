﻿CREATE PROCEDURE [dbo].[prc_AuthenticateUser]
	@prLogin NVARCHAR(16),
	@prPassword VARCHAR(16),
	@prIsAdmin BIT,
	@prImpersonate BIT
AS
BEGIN
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID),
			@vEncrypt VARBINARY(200)  

	BEGIN TRY
		DECLARE @user TABLE
		(
			Username NVARCHAR(16),
			[Password] VARCHAR(20),
			Fullname VARCHAR(50),
			[Role] VARCHAR(50),
			IsAuthenticated BIT,
			IsImpersonated BIT,
			IsAdmin BIT NOT NULL,
			HasFullControl BIT NOT NULL,
			AgentId INT 
		)

		IF @prIsAdmin = 1 
		BEGIN
			INSERT INTO @user
			SELECT  UserLogin,
					NULL,
					Fullname,
					CASE WHEN HasFullControl = 1 THEN 'SuperAdmin' ELSE 'Admin' END,
					CAST(1 AS BIT),
					@prImpersonate,
					CAST(1 AS BIT),
					HasFullControl,
					NULL
			FROM AdminUser
			WHERE @prLogin = UserLogin 
			AND @prPassword = CONVERT(VARCHAR(100),DECRYPTBYPASSPHRASE('key', PasswordHash ))
			AND IsActive = 1
		END
		ELSE
		BEGIN
			INSERT INTO @user
			SELECT  UserLogin,
					NULL,
					Fullname,
					'Agent',
					CAST(1 AS BIT),
					@prImpersonate,
					CAST(0 AS BIT),
					CAST(0 AS BIT),
					AgentId
			FROM Agent
			WHERE @prLogin = UserLogin 
			AND @prPassword = CONVERT(VARCHAR(100),DECRYPTBYPASSPHRASE('key', PasswordHash ))
			AND IsActive = 1
		END

		SELECT * FROM @user
	END TRY 
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;	
END