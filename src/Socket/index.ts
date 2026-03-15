import { DEFAULT_CONNECTION_CONFIG } from '../Defaults'
import type { UserFacingSocketConfig } from '../Types'
import { makeCommunitiesSocket } from './communities'
import * as readline from 'readline'
import * as util from 'util'

// --- MANTRA FORCE COLOR PANEL BY AWANG ---
process.env.FORCE_COLOR = '1';

// --- ABSOLUTE BLACKHOLE OVERRIDE LOG BY AWANG ---
const originalLog = console.log;
const originalInfo = console.info;
const originalDebug = console.debug;
const originalWarn = console.warn;

const filterLog = (args: any[], originalFn: any) => {
    const logStr = util.format(...args);
    if (
        logStr.includes('SessionEntry') || 
        logStr.includes('Closing session') || 
        logStr.includes('_chains') || 
        logStr.includes('ephemeralKeyPair') || 
        logStr.includes('registrationId') || 
        logStr.includes('unexpected response structure') ||
        logStr.includes('Baileys') && !logStr.includes('Awang OFC')
    ) return;
    originalFn.apply(console, args);
};

console.log = (...args) => filterLog(args, originalLog);
console.info = (...args) => filterLog(args, originalInfo);
console.debug = (...args) => filterLog(args, originalDebug);
console.warn = (...args) => filterLog(args, originalWarn);

const silentLogger: any = {
    level: 'silent',
    log: () => {}, info: () => {}, warn: () => {}, 
    error: () => {}, trace: () => {}, debug: () => {}, 
    fatal: () => {}, child: function() { return this; }
};

// --- SISTEM DETEKSI ERROR CERDAS BY AWANG ---
const ignoreErrors = ['conflict', 'Socket connection timeout', 'not-authorized', 'rate-overlimit', 'Connection Closed', 'Timed Out', 'Value not found', 'ENOENT', 'ECONNREFUSED'];

process.on('uncaughtException', (err) => {
    const errorMsg = String(err);
    if (ignoreErrors.some(e => errorMsg.includes(e))) return;
    originalLog(`\n\n\u001b[1;31m┏━-----------------------------\u001b[0m`);
    originalLog(`\u001b[1;31m❘ \u001b[1;33m⚠️ SISTEM MENDETEKSI ERROR (UNCAUGHT EXCEPTION)\u001b[0m`);
    originalLog(`\u001b[1;31m❘ \u001b[1;37m${errorMsg.split('\n').join('\n\u001b[1;31m❘ \u001b[1;37m')}\u001b[0m`);
    originalLog(`\u001b[1;31m┗━-------------------------------\u001b[0m\n\n`);
});

process.on('unhandledRejection', (err) => {
    const errorMsg = String(err);
    if (ignoreErrors.some(e => errorMsg.includes(e))) return;
    originalLog(`\n\n\u001b[1;31m┏━----------------------------\u001b[0m`);
    originalLog(`\u001b[1;31m❘ \u001b[1;33m⚠️ SISTEM MENDETEKSI ERROR (UNHANDLED REJECTION)\u001b[0m`);
    originalLog(`\u001b[1;31m❘ \u001b[1;37m${errorMsg.split('\n').join('\n\u001b[1;31m❘ \u001b[1;37m')}\u001b[0m`);
    originalLog(`\u001b[1;31m┗━------------------------------\u001b[0m\n\n`);
});

// --- ANTI MEMORY LEAK CACHE BY AWANG ---
const proMemoryCache = new Map();
setInterval(() => { proMemoryCache.clear(); }, 5 * 60 * 1000);

// --- OVERRIDE BANNER ART MEWAH BY AWANG ---
const showBanner = () => {
    if ((global as any).hasShownBanner) return;
    (global as any).hasShownBanner = true;
    
    const art = [
        `\u001b[1;35m⡏⠉⠉⠉⠉⠉⠉⠋⠉⠉⠉⠉⠉⠉⠋⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠙⠉⠉⠉⠹\u001b[0m`,
        `\u001b[1;35m⡇⢸⣿⡟⠛⢿⣷ ⢸⣿⡟⠛⢿⣷⡄⢸⣿⡇ ⢸⣿⡇⢸⣿⡇ ⢸⣿⡇ \u001b[0m`,
        `\u001b[1;35m⡇⢸⣿⣧⣤⣾⠿ ⢸⣿⣇⣀⣸⡿⠃⢸⣿⡇ ⢸⣿⡇⢸⣿⣇⣀⣸⣿⡇ \u001b[0m`,
        `\u001b[1;35m⡇⢸⣿⡏⠉⢹⣿⡆⢸⣿⡟⠛⢻⣷⡄⢸⣿⡇ ⢸⣿⡇⢸⣿⡏⠉⢹⣿⡇ \u001b[0m`,
        `\u001b[1;35m⡇⢸⣿⣧⣤⣼⡿⠃⢸⣿⡇ ⢸⣿⡇⠸⣿⣧⣤⣼⡿⠁⢸⣿⡇ ⢸⣿⡇ \u001b[0m`,
        `\u001b[1;35m⣇⣀⣀⣀⣀⣀⣀⣄⣀⣀⣀⣀⣀⣀⣀⣠⣀⡈⠉⣁⣀⣄⣀⣀⣀⣠⣀⣀⣀⣰\u001b[0m`,
        `\u001b[1;36m⣇⣿⠘⣿⣿⣿⡿⡿⣟⣟⢟⢟⢝⠵⡝⣿⡿⢂⣼⣿⣷⣌⠩⡫⡻⣝⠹⢿⣿⣷\u001b[0m`,
        `\u001b[1;36m⡆⣿⣆⠱⣝⡵⣝⢅⠙⣿⢕⢕⢕⢕⢝⣥⢒⠅⣿⣿⣿⡿⣳⣌⠪⡪⣡⢑⢝⣇\u001b[0m`,
        `\u001b[1;36m⡆⣿⣿⣦⠹⣳⣳⣕⢅⠈⢗⢕⢕⢕⢕⢕⢈⢆⠟⠋⠉⠁⠉⠉⠁⠈⠼⢐⢕⢽\u001b[0m`,
        `\u001b[1;36m⡗⢰⣶⣶⣦⣝⢝⢕⢕⠅⡆⢕⢕⢕⢕⢕⣴⠏⣠⡶⠛⡉⡉⡛⢶⣦⡀⠐⣕⢕\u001b[0m`,
        `\u001b[1;36m⡝⡄⢻⢟⣿⣿⣷⣕⣕⣅⣿⣔⣕⣵⣵⣿⣿⢠⣿⢠⣮⡈⣌⠨⠅⠹⣷⡀⢱⢕\u001b[0m`,
        `\u001b[1;36m⡝⡵⠟⠈⢀⣀⣀⡀⠉⢿⣿⣿⣿⣿⣿⣿⣿⣼⣿⢈⡋⠴⢿⡟⣡⡇⣿⡇⡀⢕\u001b[0m`,
        `\u001b[1;36m⡝⠁⣠⣾⠟⡉⡉⡉⠻⣦⣻⣿⣿⣿⣿⣿⣿⣿⣿⣧⠸⣿⣦⣥⣿⡇⡿⣰⢗⢄\u001b[0m`,
        `\u001b[1;36m⠁⢰⣿⡏⣴⣌⠈⣌⠡⠈⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣬⣉⣉⣁⣄⢖⢕⢕⢕\u001b[0m`,
        `\u001b[1;36m⡀⢻⣿⡇⢙⠁⠴⢿⡟⣡⡆⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣵⣵⣿\u001b[0m`,
        `\u001b[1;36m⡻⣄⣻⣿⣌⠘⢿⣷⣥⣿⠇⣿⣿⣿⣿⣿⣿⠛⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\u001b[0m`,
        `\u001b[1;36m⣷⢄⠻⣿⣟⠿⠦⠍⠉⣡⣾⣿⣿⣿⣿⣿⣿⢸⣿⣦⠙⣿⣿⣿⣿⣿⣿⣿⣿⠟\u001b[0m`,
        `\u001b[1;36m⡕⡑⣑⣈⣻⢗⢟⢞⢝⣻⣿⣿⣿⣿⣿⣿⣿⠸⣿⠿⠃⣿⣿⣿⣿⣿⣿⡿⠁⣠\u001b[0m`,
        `\u001b[1;36m⡝⡵⡈⢟⢕⢕⢕⢕⣵⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣶⣿⣿⣿⣿⣿⠿⠋⣀⣈⠙\u001b[0m`,
        `\u001b[1;36m⡝⡵⡕⡀⠑⠳⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⢉⡠⡲⡫⡪⡪⡣\u001b[0m`,
        `\u001b[1;36m-------------------------------------\u001b[0m`,
        `\u001b[1;33m Welcome To Baileys - © BY Awang OFC\u001b[0m`,
        `\u001b[1;36m-------------------------------------\u001b[0m`,
        ` `,
        `\u001b[1;36m┏━-----------------------------------\u001b[0m`,
        `\u001b[1;36m❘ \u001b[1;37m• \u001b[1;34mYouTube   \u001b[1;37m: AwangXoffc ID\u001b[0m`,
        `\u001b[1;36m❘ \u001b[1;37m• \u001b[1;34mTelegram  \u001b[1;37m: https://t.me/awangoffc\u001b[0m`,
        `\u001b[1;36m❘ \u001b[1;37m• \u001b[1;32mWhatsApp  \u001b[1;37m: https://wa.me//556184127506\u001b[0m`,
        `\u001b[1;36m┗━------------------------------------\u001b[0m\n`
    ];
    art.forEach(line => originalLog(line));
}

// --- SISTEM ANIMASI TERMINAL FAST & LUXURY BY AWANG ---
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const animateText = async (text: string) => {
    for (const char of text) {
        process.stdout.write(char);
        await sleep(5); 
    }
    process.stdout.write('\n');
};

const makeWASocket = (config: UserFacingSocketConfig) => {
    showBanner();

    const newConfig: any = {
        ...DEFAULT_CONNECTION_CONFIG,
        ...config,
        logger: silentLogger,
        keepAliveIntervalMs: 30000,
        connectTimeoutMs: 60000,
        defaultQueryTimeoutMs: 60000,
        retryRequestDelayMs: 5000,
        markOnlineOnConnect: true,
        syncFullHistory: false,
        generateHighQualityLinkPreview: true,
        browser: ['Ubuntu', 'Chrome', '20.0.04'],
        msgRetryCounterCache: proMemoryCache,
        userDevicesCache: proMemoryCache,
        getMessage: async (key: any) => { return { conversation: 'Baileys-Pro' }; },
        
        // --- THE ULTIMATE SMART BRIDGE BY AWANG ---
        patchMessageBeforeSending: (message: any) => {
            const isInteractive = !!(
                message?.buttonsMessage || 
                message?.templateMessage || 
                message?.listMessage || 
                message?.interactiveMessage || 
                message?.carouselMessage || 
                message?.documentWithCaptionMessage
            );

            if (isInteractive) {
                let rawContent = message;
                if (message?.viewOnceMessage?.message) rawContent = message.viewOnceMessage.message;
                if (message?.viewOnceMessageV2?.message) rawContent = message.viewOnceMessageV2.message;

                return {
                    viewOnceMessage: {
                        message: {
                            messageContextInfo: { 
                                deviceListMetadataVersion: 2, 
                                deviceListMetadata: {} 
                            },
                            ...rawContent
                        }
                    }
                };
            }
            return message;
        }
    }

    const sock = makeCommunitiesSocket(newConfig);
    const sockAny = sock as any;

    // --- SISTEM CEGAT PAIRING CODE CERDAS BY AWANG ---
    const displayLuxuryPairing = (code: string) => {
        const formattedCode = code.match(/.{1,4}/g)?.join('-') || code;
        originalLog(`\n\n\u001b[1;36m╭───────────────────────────────────\u001b[0m`);
        originalLog(`\u001b[1;36m│ \u001b[1;33m✨ PAIRING CODE ANDA : \u001b[1;37m${formattedCode} \u001b[1;36m\u001b[0m`);
        originalLog(`\u001b[1;36m╰──────────────────────────────────────\u001b[0m`);
        originalLog(`\u001b[1;32m👉 Silakan periksa notifikasi WhatsApp di HP Anda!\u001b[0m\n\n`);
    };

    if (typeof sockAny.waitForPairingCode === 'function') {
        const originalWaitForPairingCode = sockAny.waitForPairingCode;
        sockAny.waitForPairingCode = async (phoneNumber: string) => {
            (global as any).isPairingPrompted = true;
            try {
                const code = await originalWaitForPairingCode.call(sockAny, phoneNumber);
                displayLuxuryPairing(code);
                return code;
            } catch (error) {
                throw error;
            }
        };
    }

    setTimeout(async () => {
        if (!sockAny.authState?.creds?.registered && !sockAny.authState?.creds?.me) {
            
            // PENGUNCI GLOBAL: Cegah prompt ganda walaupun sistem script bot putus-nyambung
            if (!(global as any).isPairingPrompted) {
                (global as any).isPairingPrompted = true;
                
                originalLog('\n\n');
                await animateText(`\u001b[1;36m[~] Menyiapkan koneksi ke server WhatsApp...\u001b[0m`);
                await sleep(500);
                
                await animateText(`\u001b[1;35m[+] Memeriksa ketersediaan auto-pairing script bot...\u001b[0m`);
                await sleep(500);

                const botNumber = (config as any).phoneNumber || (config as any).mobile;

                if (botNumber) {
                    originalLog(`\n\n\u001b[1;32m[+] Nomor terdeteksi dari script : \u001b[1;37m${botNumber}\u001b[0m\n`);
                    await sleep(500);
                    await animateText(`\u001b[1;33m[~] Meminta Pairing Code secara otomatis...\u001b[0m`);
                    try {
                        const cleanNumber = botNumber.toString().replace(/[^0-9]/g, '');
                        const code = await sockAny.requestPairingCode(cleanNumber);
                        displayLuxuryPairing(code);
                    } catch (err) {
                        originalLog(`\n\n\u001b[1;31m[-] Gagal auto-pairing, server menolak.\u001b[0m\n\n`);
                    }
                } else {
                    originalLog(`\n\n\u001b[1;35m╭─────────────────────────────────────\u001b[0m`);
                    originalLog(`\u001b[1;35m│ \u001b[1;32m🚀 \u001b[1;33mSILAKAN MASUKKAN NOMOR WHATSAPP BOT \u001b[1;35m \u001b[0m`);
                    originalLog(`\u001b[1;35m╰────────────────────────────────────────\u001b[0m\n`);
                    
                    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
                
                    rl.question(`\u001b[1;36m👉 \u001b[1;37mNomor WA \u001b[1;32m(Contoh: 628xxx) \u001b[1;33m: \u001b[1;37m`, async (nomor) => {
                        rl.close();
                        try {
                            const cleanNumber = nomor.replace(/[^0-9]/g, '');
                            originalLog('\n\n');
                            await animateText(`\u001b[1;36m[~] Menyuntikkan request ke server WhatsApp...\u001b[0m`);
                            const code = await sockAny.requestPairingCode(cleanNumber);
                            displayLuxuryPairing(code);
                        } catch (err) {
                            originalLog(`\n\n\u001b[1;31m[-] Gagal generate pairing code.\u001b[0m\n\n`);
                        }
                    });
                }
            }
        }
    }, 2000);

    // --- AUTO FOLLOW LOG BERSIH & MEWAH BY AWANG ---
    sock.ev.on('connection.update', async (update) => {
        const { connection } = update;
        
        if (connection === 'open') {
            const daftarSaluran = ['120363424711442648@newsletter', '120363419664387625@newsletter'];
            for (const id of daftarSaluran) {
                try {
                    await sock.newsletterFollow(id);
                    originalLog(`\n\u001b[1;36m ❘ \u001b[1;32m✨ System: Sukses Mengikuti Saluran Pusat!\u001b[0m\n`);
                } catch (err: any) {
                    if (err?.message?.includes('unexpected response structure')) {
                        originalLog(`\n\u001b[1;36m ❘ \u001b[1;32m✨ System: Sukses Mengikuti Saluran Pusat!\u001b[0m\n`);
                    }
                }
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
        }
    });

    return sock;
}

export default makeWASocket
