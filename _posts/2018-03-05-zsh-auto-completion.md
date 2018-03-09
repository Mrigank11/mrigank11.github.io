---
layout: post
title: Writing your first ZSH autocompletion function
date: 2018-03-05 16:21 +0530
categories: linux
tags: zsh scripting
keywords: zsh, scription, linux, bash, autocompletion, linux
---
In this post, I'll guide you in writing few, very basic Zsh autocompletion functions. Everything will be used at its minimal level.

I'm assuming that you've a basic knowledge of **bash**.

>You need activate completion system first if you're not using something like `oh-my-zsh`. Just run(or add to `.zshrc`):
>```
>autoload -U compinit
>compinit
>```

Let's say our program is called `hello`.

Here's what will happen: 
- You write a completion function. It usually starts with `_`(underscore) :
```bash
function _hello(){
    #You write your code here
}
```
- Bind your function to a command
```bash
compdef _hello hello
```
- **Whenever** you press &lt;Tab&gt; after `hello`, `_hello` will be called.

Whenever you want to throw out possible completions, you'll use one of the following utility functions(in this post):
### compadd
You want:
```bash
hello <Tab>
    cmd1    cmd2    cmd3
```
You'll write:
```bash
comdadd cmd1 cmd2 cmd3
```
### _describe
You want:
```bash
hello <Tab>
cmd1    --  description1
cmd2    --  description2
```
You'll write:
```bash
_describe 'command' "('cmd1:description1' 'cmd2:description2')"
```
**Note**: In both of above commands, we didn't consider which argument no. it is, means even `hello cmd1 <Tab>` will give same output. Next command will solve this problem.

### _arguments
Now this is a powerful one. You can control multiple arguments.
>By multiple arguments I mean `hello arg1 arg2` not `hello arg1|arg2`

Here's the basic syntax: `_arguments <something> <something> ...` where `<something>` can either be:
- `'-o[description]'` for an _option_ 
- `'<argument number>:<message>:<what to do>'` for an _argument_

First one is self-explanatory, whenever called it'll give 
```bash
hello <Tab>
-o  --  description
```

For the second one:
- `<argument number>` is self-explanatory
- I'll leave `message` empty to demonstrate a minimal example.
- `<what to do>` can be quite a few things, we'll discuss only two:
    1. List of arguments possible at given `argument number`. For example, if two arguments(`world` and `universe`) are possible at argument one(`hello world|universe`), we can write:
    ```bash
_arguments '1: :(world universe)' <something> ...
    ```
    2. Set variable `state` to an identifier. For example, if we want to call another function at argument no. 2, we can write:
    ```bash
local state
_arguments '2: :->identifier'
case $state in
    identifier)
        #do some special work when we want completion for 2nd argument
    ...
    ```

That might be confusing, lets sum up `_arguments` by an example:

Lets say, our program has possible args like:
```bash
hello [cat|head] <file at /var/log> one|two
```
Its completion function can be:
```bash
function _hello(){
    local state 
    _arguments '1: :(cat head)' '2: :->log' '3: :->cache'

    case $state in
        log)
            _describe 'command' "($(ls $1))"    #this is for demonstration purpose only, you'll use _files utility to list a directories
            ;;
        cache)
            compadd one two #this could be done above also, in _arguments, you know how :)
            ;;
    esac
}
```

## What Next?
I hope you were able to successfully write your first autocompletion function. I recommed to visit:
- [Mads' Blog](http://mads-hartmann.com/2017/08/06/writing-zsh-completion-scripts.html)
- [Zsh Autocompletions Howto](https://github.com/zsh-users/zsh-completions/blob/master/zsh-completions-howto.org)