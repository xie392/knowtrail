// 或： npx only-allow pnpm
if(!/pnpm/.test(process.env.npm_execpath)){
    console.warn('\n \u001b[33m请使用 pnpm 运行此脚本\n \u001b[39m\n')
    process.exit(1)
}
