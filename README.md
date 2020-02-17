![terminator_rb](https://raw.githubusercontent.com/corroded/terminator_rb/master/logo/terminator_rb.svg?sanitize=true)
=========

# terminator_rb

Automate your file/method deprecations with `terminator_rb`!


## About

I have been always keen on cleaning after my mess in code. There are times when we need to have a temporary class, file, or script that we need to commit and run in a deploy ONCE. We often tend to forget about these files which contribute to tech debt and code bloat as they pile up.

I have initially thought of "spec time bombs" where I add a comment in the file when I am supposed to delete the file and raise an error in the spec if it has not been deleted by that date.

This is not as productive as I hoped it would be. One suggestion that was mentioned to me was to automate this process of deletion and create a PR ala [Dependabot](https://dependabot.com/). This is the result of that suggestion.


### Installing

For now this is a ruby script that basically searches your codebase for the files to be deleted. See intended features for the future of `terminator_rb`.

Simple include `bin/cleanup.rb` into your project folder and run it:

```
$ ruby cleanup.rb
```

### Usage

Running the script will make it look for files that have this specific comment structure:

```
# @expire_at yyyy-mm-dd
# @deprecated <comments>
```

Where `yyyy-mm-dd` will be the date the class is supposed to be deleted and `<comments>` is basically additional notes you would want
the reviewer or the reader to read when the PR is made.

This can be added into a `cron` job so it runs daily.

So far this only deletes files as this is still in progress.

## TODO

1. Automate making a PR with the deleted files
2. As per the examples in `app/models`, make it possible to delete chunks of code (say a method in a class).
3. Add specs / CI
4. Add contributing guide

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
