﻿




/****** Object:  Stored Procedure dbo.WriteLog    Script Date: 10/1/2004 3:16:36 PM ******/

CREATE PROCEDURE [dbo].[prc_WriteErrorLog]
(
	@EventID int, 
	@Priority int, 
	@Severity nvarchar(32), 
	@Title nvarchar(256), 
	@Timestamp datetime,
	@MachineName nvarchar(32), 
	@AppDomainName nvarchar(512),
	@ProcessID nvarchar(256),
	@ProcessName nvarchar(512),
	@ThreadName nvarchar(512),
	@Win32ThreadId nvarchar(128),
	@Message nvarchar(1500),
	@FormattedMessage ntext,
	@LogId int OUTPUT
)
AS 
	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID)
	BEGIN TRY

		INSERT INTO [AppErrorLog] (
			EventID,
			Priority,
			Severity,
			Title,
			[Timestamp],
			MachineName,
			AppDomainName,
			ProcessID,
			ProcessName,
			ThreadName,
			Win32ThreadId,
			Message,
			FormattedMessage
		)
		VALUES (
			@EventID, 
			@Priority, 
			@Severity, 
			@Title, 
			@Timestamp,
			@MachineName, 
			@AppDomainName,
			@ProcessID,
			@ProcessName,
			@ThreadName,
			@Win32ThreadId,
			@Message,
			@FormattedMessage)

		SET @LogID = @@IDENTITY
		RETURN @LogID

	END TRY
	BEGIN CATCH
		EXECUTE prc_LogError @vStoreProcName;
	END CATCH;