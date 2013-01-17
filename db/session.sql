CREATE TABLE IF NOT EXISTS bbPost (
    id INT NOT NULL auto_increment,
    `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    username VARCHAR(255) NOT NULL,
    hardwareId VARCHAR(32) NOT NULL,
    message TINYTEXT NOT NULL,
    PRIMARY KEY (hardwareId, id)
) ENGINE = MYISAM;

CREATE TABLE IF NOT EXISTS chatLog (
    id INT NOT NULL auto_increment,
    `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    username VARCHAR(255) NOT NULL,
    hardwareId VARCHAR(32) NOT NULL,
    chatId VARCHAR(64) NOT NULL,
    message TINYTEXT NOT NULL,
    PRIMARY KEY (hardwareId, id)
) ENGINE = MYISAM;
