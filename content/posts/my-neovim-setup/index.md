---
title: 'My Neovim Setup'
date: 2022-10-09T13:12:41+01:00
draft: false
summary: 'I am new to neovim and this is my neovim setup.'
cover:
  image: cover.jpg
  alt: 'Post cover'
  caption: 'image source: https://unsplash.com/photos/Ek9Znm8lQ1U'
tags: []
categories: []
---

I am new to neovim and haven't used vim much either, so all of this is still pretty new to me. Most of the setup I got was by following [Learn Neovim The Practical Way](https://alpha2phi.medium.com/learn-neovim-the-practical-way-8818fcf4830f#545a) by [alpha2phi](https://alpha2phi.medium.com/). Or rather almost all of my setup is from him.

## Folder/file structure

```text
nvim
├── lua
│   ├── config
│   │   ├── bufferline.lua
│   │   ├── coq.lua
│   │   ├── nvimtree.lua
│   │   └── whichkey.lua
│   ├── user
│   │   ├── init.lua
│   │   ├── keymaps.lua
│   │   ├── packer.lua
│   │   └── sets.lua
│   └── utils
│       └── finder.lua
└── init.lua
```

## Settings (lua/user/sets.lua)

```lua
vim.opt.number = true
vim.opt.relativenumber = true
vim.opt.ignorecase = true
vim.opt.smartcase = true
vim.opt.hlsearch = false
vim.opt.breakindent = true
vim.opt.tabstop = 2
vim.opt.shiftwidth = 2
vim.opt.softtabstop = 2
vim.opt.smartindent = true
vim.opt.expandtab = true

vim.g.mapleader = ' '
vim.g.maplocalleader = ' '
```

To use them we need to require them into `init.lua`. Create `init.lua` file inside `lua/user/` folder and add `require('user.sets')`. After that create another `init.lua` file inside your config root folder and add `require('user')`.

## Plugins

The first plugin I added was [wakatime](https://github.com/wakatime/vim-wakatime), because I like tracking how much time I spend coding. The theme I use is [dracula](https://draculatheme.com/vim).

- [WhichKey](https://github.com/folke/which-key.nvim) - shows possible key bindings
- [Comment.nvim](https://github.com/numToStr/Comment.nvim) - easy way to comment
- [Nvim Tree](https://github.com/nvim-tree/nvim-tree.lua) - File explorer
- [Bufferline](https://github.com/akinsho/bufferline.nvim) - tabs for open buffers / files
- [Markdown preview](https://github.com/iamcco/markdown-preview.nvim) - live markdown preview
- [coq](https://github.com/ms-jpq/coq_nvim) - completion plugin
- [fzf-lua](https://github.com/ibhagwan/fzf-lua) - fuzzy finder for neovim

#### /lua/user/packer.lua

```lua
return require('packer').startup(function(use)
  -- Packer can manage itself
  use 'wbthomason/packer.nvim'
  use 'wakatime/vim-wakatime'

  use {
    'dracula/vim',
    config = function()
      vim.cmd 'colorscheme dracula'
    end,
  }

  -- WhichKey
  use {
    'folke/which-key.nvim',
    event = 'VimEnter',
    config = function()
      require('config.whichkey').setup()
    end,
  }

  -- Better Comment
  use {
    'numToStr/Comment.nvim',
    opt = true,
    keys = { 'gc', 'gcc', 'gbc' },
    config = function()
      require('Comment').setup {}
    end,
  }

  -- Nvim Tree
  use {
    'nvim-tree/nvim-tree.lua',
    requires = {
      'nvim-tree/nvim-web-devicons',
    },
    cmd = { 'NvimTreeToggle', 'NvimTreeClose' },
    config = function()
      require('config.nvimtree').setup()
    end,
  }

  -- Buffer Line
  use {
    'akinsho/nvim-bufferline.lua',
    event = 'BufReadPre',
    wants = 'nvim-web-devicons',
    config = function()
      require('config.bufferline').setup()
    end,
  }

  -- Markdown preview
  use {
    "iamcco/markdown-preview.nvim",
    run = function()
      vim.fn["mkdp#util#install"]()
    end,
    ft = "markdown",
    cmd = { "MarkdownPreview" },
  }

  -- Completion
  use {
    "ms-jpq/coq_nvim",
    branch = "coq",
    event = "InsertEnter",
    opt = true,
    run = ":COQdeps",
    config = function()
      require("config.coq").setup()
    end,
    requires = {
      { "ms-jpq/coq.artifacts", branch = "artifacts" },
      { "ms-jpq/coq.thirdparty", branch = "3p", module = "coq_3p" },
    },
    disable = false,
  }

  -- fzf
  use { "junegunn/fzf", run = "./install --all" }
  -- use { "junegunn/fzf.vim" }
  use {
   "ibhagwan/fzf-lua",
    requires = { "kyazdani42/nvim-web-devicons" },
  }

end)
```

Add `require('user.packer')` to `/lua/user/init.lua`.

#### /lua/user/keymaps.lua

```lua
local keymap = vim.api.nvim_set_keymap
local default_opts = { noremap = true, silent = true }

-- Switch buffer
keymap('n', '<S-h>', ':bprevious<CR>', default_opts)
keymap('n', '<S-l>', ':bnext<CR>', default_opts)

-- Move selected line / block of text in normal / visual mode
keymap('n', 'K', '<CMD>move .-2<CR>', default_opts)
keymap('n', 'J', '<CMD>move .+1<CR>', default_opts)
keymap('x', 'K', ":move '<-2<CR>gv-gv", default_opts)
keymap('x', 'J', ":move '>+1<CR>gv-gv", default_opts)
```

For those keymaps to work add `require('user.keymaps')` to `/lua/user/init.lua`.

## Configs for some plugins

All config files are located inside `/lua/config/` folder.

#### /lua/config/bufferline.lua

```lua
local M = {}

function M.setup()
  require('bufferline').setup {
    options = {
      numbers = 'none',
      diagnostics = 'nvim_lsp',
      seperator_style = 'slant' or 'padded_slant',
      show_tab_indicators = true,
      show_buffer_close_icons = false,
      show_close_icon = false,
    },
  }
end

return M
```

#### /lua/config/coq.lua

```lua
local M = {}

function M.setup()
  local coq = require "coq"
  coq.Now() -- Start coq

  -- 3party sources
  require "coq_3p" {
    { src = "nvimlua", short_name = "nLUA", conf_only = false }, -- Lua
    { src = "bc", short_name = "MATH", precision = 6 }, -- Calculator
    { src = "cow", trigger = "!cow" }, -- cow command
    { src = "figlet", trigger = "!big" }, -- figlet command
    {
      src = "repl",
      sh = "zsh",
      shell = { p = "perl", n = "node" },
      max_lines = 99,
      deadline = 500,
      unsafe = { "rm", "poweroff", "mv" },
    },
  }
end

return M
```

#### /lua/config/nvimtree.lua

```lua
local M = {}

function M.setup()
  require('nvim-tree').setup {
    disable_netrw = true,
    hijack_netrw = true,
    view = {
      number = true,
      relativenumber = true,
    },
    filters = {
      custom = { '.git' },
    },
  }
end

return M
```

#### /lua/config/whichkey.lua

```lua
local M = {}

function M.setup()
  local whichkey = require "which-key"

  local conf = {
    window = {
      border = "single", -- none, single, double, shadow
      position = "bottom", -- bottom, top
    },
  }

  local opts = {
    mode = "n", -- Normal mode
    prefix = "<leader>",
    buffer = nil, -- Global mappings. Specify a buffer number for buffer local mappings
    silent = true, -- use `silent` when creating keymaps
    noremap = true, -- use `noremap` when creating keymaps
    nowait = false, -- use `nowait` when creating keymaps
  }

  local mappings = {
    ["w"] = { "<cmd>update!<CR>", "Save" },
    ["q"] = { "<cmd>q!<CR>", "Quit" },

    b = {
      name = "Buffer",
      c = { "<Cmd>bd!<Cr>", "Close current buffer" },
      D = { "<Cmd>%bd|e#|bd#<Cr>", "Delete all buffers" },
    },

    z = {
      name = "Packer",
      c = { "<cmd>PackerCompile<cr>", "Compile" },
      i = { "<cmd>PackerInstall<cr>", "Install" },
      s = { "<cmd>PackerSync<cr>", "Sync" },
      S = { "<cmd>PackerStatus<cr>", "Status" },
      u = { "<cmd>PackerUpdate<cr>", "Update" },
    },

    f = {
      name = "Find",
      f = { "<cmd>lua require('utils.finder').find_files()<cr>", "Files" },
      b = { "<cmd>FzfLua buffers<cr>", "Buffers" },
      o = { "<cmd>FzfLua oldfiles<cr>", "Old files" },
      g = { "<cmd>FzfLua live_grep<cr>", "Live grep" },
      c = { "<cmd>FzfLua commands<cr>", "Commands" },
      e = { "<cmd>NvimTreeToggle<cr>", "Explorer" },
    },
  }

  whichkey.setup(conf)
  whichkey.register(mappings, opts)
end

return M
```

Once again I barely know anything about vim/neovim so all those plugins and configs are just from some other people, mostly from the person I mentioned at the top of the post. I am trying to learn neovim only, because it seems interesting and kind of cool.

You can check my current neovim setup [here](https://github.com/Lisviks/neovim-setup).
