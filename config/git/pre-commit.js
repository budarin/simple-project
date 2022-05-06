#!/usr/bin/env node
/**
 * sudo chmod 774 /config/git/pre-commit.js
 * https://medium.com/@Sergeon/using-javascript-in-your-git-hooks-f0ce09477334
 *
 * This code will ensure that before every commit in your client repository, your branch name and commit message adheres to a certain contract.
 * In this example, branch names must be like 'feature/AP-22-some-feature-name' or 'hotfix/AP-30-invitation-email-not-sending',
 * and commit messages must start like some issue code, like AP-100 or AP-101.
 *
 * 'AP' just stands for Acme Platform and is an example. I made this example with Jira in mind,
 * since Jira issue codes have this structure -as far as I know-, but is pretty easy to change it to any other issue id like #100 or $-AP-120, or whatever.
 *
 * In order for this to work, you should go to .git/hooks in any git client repository and create a commit-msg file (or modify the provided by default, commit-msg.sample) with
 * this contents.
 *
 * You need an await/async compliant version of node installed in your machine.
 *
 * Don't forget to make your file executable!
 */

const fs = require('fs');
const util = require('util');
const childProcessExec = require('child_process').exec;
const exec = util.promisify(childProcessExec);

const metaTag = 'META';
const TIMEOUT_THRESHOLD = 3000;
const COMMIT_PATH = '.git/COMMIT_EDITMSG';

const getCurrentBranch = async () => {
    const branchesOutput = await exec('git symbolic-ref --short HEAD');

    if (branchesOutput.stderr) {
        throw new Error(branchesOutput.stderr);
    }
    return branchesOutput.stdout.split('\n')[0].trim();
};

const handleGitBranchCommandError = (e) => {
    console.log('commit error:');
    console.log(e.message);
    console.log('----');
    console.log('Your commit will be rejected.');
    process.exit(1);
};

const hookCleanup = () => {
    setTimeout(() => {
        console.log(
            'This is a timeout message from your commit-msg git hook. If you see this, something bad happened in your pre-commit hook, and it absolutely did not work as expected.',
        );
        console.log(
            ' Your commit will be rejected. Please read any previous error message related to your commit message, and/or check the commit-msg git hook script.',
        );
        console.log(
            ' You can find more info in this link: https://git-scm.com/book/uz/v2/Customizing-Git-An-Example-Git-Enforced-Policy',
        );
        process.exit(1);
    }, TIMEOUT_THRESHOLD);
};

const processCommit = async () => {
    let branchName = '';
    try {
        branchName = await getCurrentBranch();

        const msg = fs.readFileSync(COMMIT_PATH, 'utf8').trim();
        const lines = msg.replace('\r\n', '\n').split('\n');

        // последняя строка должна начинаться с META и содержать branchName
        while (lines[lines.length - 1] === '' || lines.length === 0) {
            lines.length = lines.length - 1;
        }

        const metaLine = lines[lines.length - 1].trim();

        if (!metaLine.startsWith(metaTag)) {
            lines.push('');
            lines.push(`${metaTag}: ${branchName}`);
        } else {
            lines[lines.length - 1] = metaLine.replace(metaTag + ': ', `${metaTag}: ${branchName}, `);
        }

        fs.writeFileSync(COMMIT_PATH, lines.join('\n'));
    } catch (e) {
        handleGitBranchCommandError(e);
    }

    process.exit(0);
};

processCommit();

hookCleanup();
