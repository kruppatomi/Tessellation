USE [Your MS SQL Database name]
GO

/****** Object:  Table [dbo].[users]    Script Date: 2020. 07. 24. 8:49:05 ******/
DROP TABLE [dbo].[users]
GO

/****** Object:  Table [dbo].[users]    Script Date: 2020. 07. 24. 8:49:06 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NULL,
	[password] [varchar](90) NULL
) ON [PRIMARY]
GO

