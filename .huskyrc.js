const ruYarnLock = 'yarn install --frozen-lockfile';

module.exports = {
    hooks: {
        'prepare-commit-msg': 'node ./config/git/pre-commit.js',
        'pre-commit': 'sh ./scripts/lint.sh',
        'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS -g config/git/commitlint.js',
        'pre-push': 'sh ./config/git/preventPushToMaster.sh',
        'post-checkout': `if [[ $HUSKY_GIT_PARAMS =~ 1$ ]]; then ${ruYarnLock}; fi`,
        'post-merge': ruYarnLock,
        'post-rebase': 'yarn install',
    },
};
