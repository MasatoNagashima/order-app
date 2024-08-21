## Description
Design Docs: https://www.notion.so/

Design-Docs-291a8c5a214e47a9abc5bb837a602abe#93c9ca9f1930424f9b67b26b05447fad
App Design: https://www.figma.com/design/kqrEjpUQV4oRJEZv04j0AE/OrderSystem?node-id=0-1&t=KugGRepGGzl6taRR-0

## How to Run This App
### Install Anyenv
```bash
$ git clone https://github.com/anyenv/anyenv ~/.anyenv
$ echo 'export PATH="$HOME/.anyenv/bin:$PATH"' >> ~/.bashrc
$ ~/.anyenv/bin/anyenv init
$ anyenv install --init
$ echo 'eval "$(anyenv init -)"' >> ~/.bash_profile
```

### Install Repo and Node.js
```bash
$ git clone https://github.com/MasatoNagashima/order-app.git
$ cd order-app
order-app $ anyenv install nodenv
order-app $ exec $SHELL -l
order-app $ nodenv install 19.0.0
order-app $ nodenv local 19.0.0
```

### Update Environment Settings
Update .env.local file as below.
```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Run This App
```bash
order-app $ npm install
order-app $ npm run dev
```

## Package Installation

```bash
npm add <package>
```
