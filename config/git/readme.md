at first every hook must be marked as executable

chmod -x ./config/git/preventPushToMaster.sh
chmod -x ./config/git/ts-precommit.sh

для того чтобы git различал кейс написания файлов и папок на винде и маке - git config core.ignorecase false
