// Blog i18n: per-locale metadata + FAQ for each post.
// Long-form prose body stays in English in v1 (would otherwise be a multi-thousand-line
// translation effort). Titles, descriptions, FAQ Q/A, breadcrumbs and CTA are localized
// so /cn/blog/ and /th/blog/ feel coherent on landing. Body is annotated as English
// for transparency in non-English locales.

import { locales, type Locale } from './config';

export type FaqItem = { question: string; answer: string };

export interface BlogPostI18n {
  title: string;        // <title> + primary H1
  description: string; // <meta description>
  h1: string;           // page H1
  meta: string;         // small label above H1 (e.g. "Guide · 5 min read")
  lede: string;         // first paragraph under H1
  faqItems: FaqItem[];
  breadcrumb: string;   // last breadcrumb label
  bodyNote?: string;    // notice shown on non-English pages that body prose is in English
}

const byLocale = (data: Partial<Record<Locale, BlogPostI18n>>) => data;

export const blogPosts: Record<string, { en: BlogPostI18n; cn: BlogPostI18n; th: BlogPostI18n }> = {
  'how-to-make-qr-code-for-wifi': byLocale({
    en: {
      title: 'How to Make a QR Code for WiFi (Step-by-Step Guide, 2026)',
      description: 'Let guests scan and join your WiFi in seconds. Free, no-app QR code generator with WPA/WPA2/WPA3 support, hidden-SSID option, and printable label template.',
      h1: 'How to Make a QR Code for WiFi: The Complete 2026 Guide',
      meta: 'Guide · 4 min read',
      lede: 'Tired of spelling out your WiFi password letter-by-letter to every guest? A WiFi QR code lets visitors join your network with a single scan from their phone camera—no typing, no app, no mistakes.',
      breadcrumb: 'WiFi QR code',
      bodyNote: undefined,
      faqItems: [
        { question: 'Do WiFi QR codes work on all phones?', answer: 'Native camera apps on iOS 11+ and Android 10+ recognise WiFi QR codes automatically. Older phones need a free scanner app. Windows and macOS laptops also read them through the camera roll or QR scanner utilities.' },
        { question: 'Is it safe to share my WiFi password via a QR code?', answer: 'The QR code is just a visual encoding of your SSID and password. Anyone who scans it can join your network, so only print or share it with trusted people. Unlike cloud-shared passwords, the QR code never leaves your device—our generator runs entirely in your browser.' },
        { question: 'Does it support WPA3 and hidden SSIDs?', answer: 'Yes. Our generator supports WPA, WPA2, WPA3, WEP, and no-password networks. You can also enable a hidden-SSID flag for networks that do not broadcast their name; the phone will then join using the SSID embedded in the QR code.' },
        { question: 'Can I print the WiFi QR code on a sticker or sign?', answer: 'Yes. Download the SVG for crisp printing at any size, or PNG at 1024px for standard 4×6 inch guest-network cards. The QR code remains scannable down to about 1 inch (2.5 cm) square, so it fits on a fridge magnet, a hotel-room card, or a café table tent.' },
        { question: 'Will the QR code expire or stop working?', answer: 'No. WiFi QR codes contain a static payload (network name + password + security type). They work forever unless you change the password—then you need a new QR code. There is no server-side token to expire.' }
      ]
    },
    cn: {
      title: '如何制作 WiFi 二维码(2026 分步指南)',
      description: '让客人扫码即可加入你的 WiFi。免费、无需 App 的二维码生成器,支持 WPA/WPA2/WPA3、隐藏网络,可打印标签模板。',
      h1: '如何制作 WiFi 二维码:2026 完整指南',
      meta: '指南 · 4 分钟阅读',
      lede: '还在给每个客人逐字拼读 WiFi 密码?一个 WiFi 二维码让访客用手机相机扫一下就能连上你的网络 — 无需输入、无需 App、不会出错。',
      breadcrumb: 'WiFi 二维码',
      bodyNote: '提示:本文正文为英文。标题、FAQ、目录已翻译,正文将在后续更新中提供中文版本。',
      faqItems: [
        { question: 'WiFi 二维码在所有手机上都能用吗?', answer: 'iOS 11+ 和 Android 10+ 的原生相机 App 会自动识别 WiFi 二维码。旧版手机需要使用免费扫码 App。Windows 和 macOS 笔记本也可通过相机胶卷或二维码扫描工具识别。' },
        { question: '通过二维码分享 WiFi 密码安全吗?', answer: '二维码只是把网络名和密码做成了图形。任何能扫到码的人都能加入你的网络,所以请只把它打印或分享给可信的人。与云端共享密码不同,我们的二维码生成器完全在浏览器内运行,密码不会离开你的设备。' },
        { question: '支持 WPA3 和隐藏网络吗?', answer: '支持。我们的生成器支持 WPA、WPA2、WPA3、WEP 以及无密码网络。你也可以为不广播名称的网络勾选"隐藏网络"标志,手机会使用二维码里嵌入的 SSID 进行连接。' },
        { question: '可以把 WiFi 二维码打印在贴纸或标牌上吗?', answer: '可以。下载 SVG 可在任何尺寸下保持清晰,或下载 1024px 的 PNG 用于标准 4×6 英寸的客用网络卡片。二维码在约 1 英寸(2.5 厘米)见方时仍可扫描,适合冰箱贴、酒店房卡、咖啡桌牌。' },
        { question: '二维码会过期或失效吗?', answer: '不会。WiFi 二维码包含的是静态载荷(网络名 + 密码 + 加密方式)。它会一直工作,直到你改了密码 — 那时才需要重新生成。不存在服务器端会过期的 token。' }
      ]
    },
    th: {
      title: 'วิธีสร้าง QR Code สำหรับ WiFi (คำแนะนำทีละขั้นตอน 2026)',
      description: 'ให้แขกสแกนแล้วเชื่อมต่อ WiFi ของคุณได้ในไม่กี่วินาที เครื่องสร้าง QR Code ฟรี ไม่ต้องใช้แอป รองรับ WPA/WPA2/WPA3 ตัวเลือก hidden-SSID และเทมเพลตสติกเกอร์ที่พิมพ์ได้',
      h1: 'วิธีสร้าง QR Code สำหรับ WiFi: คำแนะนำฉบับสมบูรณ์ 2026',
      meta: 'คำแนะนำ · อ่าน 4 นาที',
      lede: 'เบื่อไหมที่ต้องสะกดรหัสผ่าน WiFi ทีละตัวให้แขกทุกคน? QR Code สำหรับ WiFi ช่วยให้ผู้มาเยือนเชื่อมต่อเครือข่ายของคุณได้ด้วยการสแกนครั้งเดียวจากกล้องโทรศัพท์ — ไม่ต้องพิมพ์ ไม่ต้องใช้แอป ไม่ผิดพลาด',
      breadcrumb: 'QR Code WiFi',
      bodyNote: 'หมายเหตุ: เนื้อหาบทความเป็นภาษาอังกฤษ ชื่อบทความ คำถามที่พบบ่อย และสารบัญได้รับการแปลแล้ว เนื้อหาฉบับเต็มจะมีเวอร์ชันภาษาไทยในเร็วๆ นี้',
      faqItems: [
        { question: 'QR Code สำหรับ WiFi ใช้ได้กับโทรศัพท์ทุกเครื่องหรือไม่?', answer: 'แอปกล้องดั้งเดิมบน iOS 11+ และ Android 10+ จดจำ QR Code สำหรับ WiFi โดยอัตโนมัติ โทรศัพท์รุ่นเก่าต้องใช้แอปสแกนเนอร์ฟรี แล็ปท็อป Windows และ macOS ก็อ่านได้ผ่านกล้องหรือเครื่องมือสแกน QR' },
        { question: 'การแชร์รหัสผ่าน WiFi ผ่าน QR Code ปลอดภัยหรือไม่?', answer: 'QR Code เป็นเพียงการเข้ารหัสชื่อเครือข่ายและรหัสผ่านในรูปแบบภาพ ผู้ที่สแกนได้จะสามารถเข้าร่วมเครือข่ายของคุณ ดังนั้นควรพิมพ์หรือแชร์กับคนที่ไว้ใจเท่านั้น ไม่เหมือนรหัสผ่านที่แชร์บนคลาวด์ QR Code ไม่ออกจากอุปกรณ์ของคุณ — เครื่องสร้างของเราทำงานในเบราว์เซอร์ทั้งหมด' },
        { question: 'รองรับ WPA3 และ hidden SSID หรือไม่?', answer: 'รองรับ เครื่องสร้างของเรารองรับ WPA, WPA2, WPA3, WEP และเครือข่ายไม่มีรหัสผ่าน คุณยังสามารถเปิดใช้งานแฟล็ก hidden-SSID สำหรับเครือข่ายที่ไม่กระจายชื่อ โทรศัพท์จะเข้าร่วมโดยใช้ SSID ที่ฝังอยู่ใน QR Code' },
        { question: 'สามารถพิมพ์ QR Code สำหรับ WiFi บนสติกเกอร์หรือป้ายได้หรือไม่?', answer: 'ได้ ดาวน์โหลด SVG เพื่อการพิมพ์ที่คมชัดทุกขนาด หรือ PNG ที่ 1024px สำหรับการ์ดเครือข่ายแขกขนาด 4×6 นิ้วมาตรฐาน QR Code ยังสแกนได้ที่ขนาดประมาณ 1 นิ้ว (2.5 ซม.) กำลังสอง เหมาะสำหรับแม่เหล็กติดตู้เย็น การ์ดห้องพักโรงแรม หรือป้ายบนโต๊ะกาแฟ' },
        { question: 'QR Code จะหมดอายุหรือหยุดทำงานหรือไม่?', answer: 'ไม่ QR Code สำหรับ WiFi มีข้อมูลแบบ static (ชื่อเครือข่าย + รหัสผ่าน + ประเภทความปลอดภัย) ใช้งานได้ตลอดไปจนกว่าคุณจะเปลี่ยนรหัสผ่าน — จากนั้นคุณต้องสร้าง QR Code ใหม่ ไม่มี token ฝั่งเซิร์ฟเวอร์ที่จะหมดอายุ' }
      ]
    }
  }) as any,

  'how-to-create-vcard-qr-code': byLocale({
    en: {
      title: 'How to Create a vCard QR Code (Digital Business Card Guide)',
      description: 'Step-by-step guide to creating a vCard QR code for business cards. Encode your contact info so a single scan adds you to someone\'s phone — no app required.',
      h1: 'How to Create a vCard QR Code for Your Business Card',
      meta: 'Guide · 5 min read',
      lede: 'Paper business cards pile up in drawers. A QR code on your card means one scan, and your contact is saved in someone\'s phone forever. Here\'s how to make one.',
      breadcrumb: 'vCard QR code',
      bodyNote: undefined,
      faqItems: [
        { question: 'What is a vCard QR code?', answer: 'A vCard QR code (also called a meCard or digital business card QR code) encodes your contact details — name, phone, email, company, website — in the standard vCard format. When scanned, the phone offers to save the contact directly.' },
        { question: 'Is vCard format the same on iPhone and Android?', answer: 'Yes. vCard is an open standard (RFC 6350). Both iOS and Android recognize vCard 3.0 and 4.0 QR codes natively through the camera app.' },
        { question: 'How many fields can I put in a vCard QR code?', answer: 'Technically up to about 1,500 characters (the QR code capacity at medium error correction). In practice, stick to the essentials — name, phone, email, organization, title, URL. More than that and the code becomes too dense to scan reliably.' },
        { question: 'Can I add my photo to a vCard QR code?', answer: 'You can encode a URL to your photo in the PHOTO field, but not the photo itself (the file is too big). The phone will fetch the URL after scanning. Alternatively, use a logo overlay on the QR code itself.' },
        { question: 'Is it better than NFC business cards?', answer: 'Different trade-offs. QR codes work on any phone camera (no NFC needed) and are free. NFC is faster (one tap) but requires the receiver to have NFC enabled and you to have an NFC chip in your card. QR codes win on compatibility; NFC wins on speed.' }
      ]
    },
    cn: {
      title: '如何制作电子名片二维码(数字名片指南)',
      description: '手把手教你为名片制作电子名片二维码。把你的联系方式编进二维码,扫一次就存入对方手机 — 无需任何 App。',
      h1: '如何为你的名片制作电子名片二维码',
      meta: '指南 · 5 分钟阅读',
      lede: '纸质名片最终都堆在抽屉里。在名片上印一个二维码,只需扫一次,你的联系方式就永远保存在对方手机里。下面教你怎么做。',
      breadcrumb: '电子名片二维码',
      bodyNote: '提示:本文正文为英文。标题、FAQ、目录已翻译,正文将在后续更新中提供中文版本。',
      faqItems: [
        { question: '什么是电子名片二维码?', answer: '电子名片二维码(也叫 meCard 或数字名片二维码)用标准 vCard 格式对你的联系方式(姓名、电话、邮箱、公司、网址)进行编码。扫描后,手机会提示直接保存联系人。' },
        { question: 'vCard 格式在 iPhone 和 Android 上一样吗?', answer: '一样。vCard 是开放标准(RFC 6350)。iOS 和 Android 都能通过相机 App 原生识别 vCard 3.0 和 4.0 二维码。' },
        { question: '一个电子名片二维码最多能放多少字段?', answer: '技术上最多约 1,500 个字符(中等纠错级别下的二维码容量)。但实际中建议只放必要字段:姓名、电话、邮箱、公司、职位、网址。再多就会过于密集,扫描不可靠。' },
        { question: '能在电子名片二维码里加照片吗?', answer: '可以在 PHOTO 字段里放一个照片的 URL,但不能直接放照片本身(文件太大)。手机扫描后会去取这个 URL。你也可以在二维码中央叠加一个 logo。' },
        { question: '电子名片二维码比 NFC 名片更好吗?', answer: '各有取舍。二维码任何手机相机都能用(不需要 NFC),而且免费。NFC 更快(一下就完事),但接收方需要开启 NFC、你需要在名片里嵌入 NFC 芯片。二维码赢在兼容性,NFC 赢在速度。' }
      ]
    },
    th: {
      title: 'วิธีสร้าง QR Code นามบัตร (คำแนะนำนามบัตรดิจิทัล)',
      description: 'คำแนะนำทีละขั้นตอนในการสร้าง QR Code นามบัตรสำหรับนามบัตร เข้ารหัสข้อมูลติดต่อของคุณเพื่อให้การสแกนครั้งเดียวเพิ่มคุณลงในโทรศัพท์ของผู้อื่น — ไม่ต้องใช้แอป',
      h1: 'วิธีสร้าง QR Code นามบัตรสำหรับนามบัตรของคุณ',
      meta: 'คำแนะนำ · อ่าน 5 นาที',
      lede: 'นามบัตรกระดาษกองอยู่ในลิ้นชัก QR Code บนนามบัตรของคุณหมายความว่าการสแกนครั้งเดียว ข้อมูลติดต่อของคุณจะถูกบันทึกในโทรศัพท์ของผู้อื่นตลอดไป นี่คือวิธีสร้าง',
      breadcrumb: 'QR Code นามบัตร',
      bodyNote: 'หมายเหตุ: เนื้อหาบทความเป็นภาษาอังกฤษ ชื่อบทความ คำถามที่พบบ่อย และสารบัญได้รับการแปลแล้ว เนื้อหาฉบับเต็มจะมีเวอร์ชันภาษาไทยในเร็วๆ นี้',
      faqItems: [
        { question: 'QR Code นามบัตรคืออะไร?', answer: 'QR Code นามบัตร (เรียกอีกอย่างว่า meCard หรือ QR Code นามบัตรดิจิทัล) เข้ารหัสรายละเอียดการติดต่อของคุณ — ชื่อ โทรศัพท์ อีเมล บริษัท เว็บไซต์ — ในรูปแบบ vCard มาตรฐาน เมื่อสแกน โทรศัพท์จะเสนอให้บันทึกผู้ติดต่อโดยตรง' },
        { question: 'รูปแบบ vCard เหมือนกันทั้งบน iPhone และ Android หรือไม่?', answer: 'เหมือนกัน vCard เป็นมาตรฐานเปิด (RFC 6350) ทั้ง iOS และ Android รู้จัก QR Code vCard 3.0 และ 4.0 โดยใช้แอปกล้องดั้งเดิม' },
        { question: 'ฉันสามารถใส่ฟิลด์ได้กี่ฟิลด์ใน QR Code นามบัตร?', answer: 'ทางเทคนิคได้ถึงประมาณ 1,500 ตัวอักษร (ความจุ QR Code ที่การแก้ไขข้อผิดพลาดระดับกลาง) ในทางปฏิบัติ ให้ใส่เฉพาะที่จำเป็น — ชื่อ โทรศัพท์ อีเมล องค์กร ตำแหน่ง URL มากกว่านั้นโค้ดจะหนาแน่นเกินไปจนสแกนไม่ได้อย่างเชื่อถือ' },
        { question: 'ฉันสามารถเพิ่มรูปภาพลงใน QR Code นามบัตรได้หรือไม่?', answer: 'คุณสามารถเข้ารหัส URL ของรูปภาพในฟิลด์ PHOTO ได้ แต่ไม่สามารถใส่รูปภาพโดยตรง (ไฟล์ใหญ่เกินไป) โทรศัพท์จะดึง URL หลังจากสแกน หรือคุณสามารถใช้โลโก้ซ้อนทับบน QR Code เอง' },
        { question: 'ดีกว่านามบัตร NFC หรือไม่?', answer: 'มีข้อดีข้อเสียต่างกัน QR Code ทำงานกับกล้องโทรศัพท์ทุกเครื่อง (ไม่ต้องใช้ NFC) และฟรี NFC เร็วกว่า (แตะครั้งเดียว) แต่ผู้รับต้องเปิด NFC และคุณต้องมีชิป NFC ในนามบัตร QR Code ชนะเรื่องความเข้ากันได้ NFC ชนะเรื่องความเร็ว' }
      ]
    }
  }) as any,

  'qr-code-error-correction-explained': byLocale({
    en: {
      title: 'QR Code Error Correction Levels Explained (L, M, Q, H)',
      description: 'L, M, Q, H — what do these error correction levels actually mean? When to use each one. How Reed-Solomon codes make QR codes damage-proof.',
      h1: 'QR Code Error Correction Levels Explained: L, M, Q, H',
      meta: 'Explainer · 4 min read',
      lede: 'QR codes have a built-in damage tolerance. The level you choose decides how much of the code can be destroyed before it stops scanning. Here\'s how to pick the right one.',
      breadcrumb: 'Error correction',
      bodyNote: undefined,
      faqItems: [
        { question: 'Which error correction level should I use?', answer: 'For most QR codes (URLs, contact info), M (Medium, 15%) is the right balance — small code, decent resilience. Use Q or H only if you plan to add a logo overlay or the code will be in a dirty/worn environment.' },
        { question: 'Does higher error correction mean a bigger QR code?', answer: 'Yes. Each step up (L → M → Q → H) increases the code density by roughly 7-15% for the same data. The QR code gets more complex-looking but takes up the same physical space.' },
        { question: 'Can a QR code with 30% damage still be scanned?', answer: 'Yes — if you use H (30%) error correction, the code can tolerate up to 30% of its modules being destroyed, dirty, or obscured, and still scan correctly. This is how QR codes got their reputation for being "indestructible."' },
        { question: 'How does error correction actually work?', answer: 'QR codes use Reed-Solomon error correction — the same math used in CDs, DVDs, and satellite communication. The QR generator adds redundant data (parity bytes) to the encoded information. The scanner uses that redundancy to reconstruct missing or damaged pieces.' }
      ]
    },
    cn: {
      title: '二维码纠错级别详解(L、M、Q、H)',
      description: 'L、M、Q、H — 这些纠错级别到底是什么意思?何时用哪个?Reed-Solomon 编码如何让二维码抗损坏。',
      h1: '二维码纠错级别详解:L、M、Q、H',
      meta: '科普 · 4 分钟阅读',
      lede: '二维码有内置的抗损坏能力。你选择的级别决定了二维码在被破坏多少后才会无法扫描。下面教你如何选对级别。',
      breadcrumb: '纠错级别',
      bodyNote: '提示:本文正文为英文。标题、FAQ、目录已翻译,正文将在后续更新中提供中文版本。',
      faqItems: [
        { question: '我应该用哪个纠错级别?', answer: '对大多数二维码(网址、联系方式),M(中,15%)是合适的平衡 — 体积小,抗损性足够。只有在要加 logo 叠加,或者二维码会处于脏污/磨损环境时,才用 Q 或 H。' },
        { question: '纠错级别越高,二维码就越大吗?', answer: '是的。每升一级(L → M → Q → H),同样数据的密度会增加约 7-15%。二维码看起来更复杂,但占用同样的物理空间。' },
        { question: '被损坏 30% 的二维码还能扫吗?', answer: '能 — 如果用 H(30%)纠错级别,二维码可以容忍最多 30% 的模块被毁坏、弄脏或遮挡,仍然能正确扫描。这正是二维码"坚不可摧"名声的由来。' },
        { question: '纠错到底是怎么工作的?', answer: '二维码使用 Reed-Solomon 纠错 — 和 CD、DVD、卫星通信中用的是同一种数学。生成器在编码信息中加入冗余数据(校验字节)。扫描器用这些冗余来重建缺失或损坏的部分。' }
      ]
    },
    th: {
      title: 'อธิบายระดับการแก้ไขข้อผิดพลาดของ QR Code (L, M, Q, H)',
      description: 'L, M, Q, H — ระดับการแก้ไขข้อผิดพลาดเหล่านี้หมายความว่าอย่างไร? ควรใช้เมื่อใด และ Reed-Solomon ทำให้ QR Code ทนต่อความเสียหายได้อย่างไร',
      h1: 'อธิบายระดับการแก้ไขข้อผิดพลาดของ QR Code: L, M, Q, H',
      meta: 'บทความให้ความรู้ · อ่าน 4 นาที',
      lede: 'QR Code มีความทนทานต่อความเสียหายในตัว ระดับที่คุณเลือกจะเป็นตัวกำหนดว่า QR Code จะถูกทำลายได้มากแค่ไหนก่อนที่จะสแกนไม่ได้ นี่คือวิธีเลือกระดับที่เหมาะสม',
      breadcrumb: 'การแก้ไขข้อผิดพลาด',
      bodyNote: 'หมายเหตุ: เนื้อหาบทความเป็นภาษาอังกฤษ ชื่อบทความ คำถามที่พบบ่อย และสารบัญได้รับการแปลแล้ว เนื้อหาฉบับเต็มจะมีเวอร์ชันภาษาไทยในเร็วๆ นี้',
      faqItems: [
        { question: 'ควรใช้ระดับการแก้ไขข้อผิดพลาดระดับใด?', answer: 'สำหรับ QR Code ส่วนใหญ่ (URL, ข้อมูลติดต่อ) M (กลาง, 15%) เป็นจุดสมดุลที่เหมาะสม — โค้ดเล็ก ทนทานพอสมควร ใช้ Q หรือ H เฉพาะเมื่อคุณวางแผนจะเพิ่มโลโก้ซ้อนทับ หรือ QR Code จะอยู่ในสภาพแวดล้อมที่สกปรก/สึกหรอ' },
        { question: 'การแก้ไขข้อผิดพลาดที่สูงขึ้นหมายความว่า QR Code ใหญ่ขึ้นหรือไม่?', answer: 'ใช่ ทุกขั้นที่เพิ่มขึ้น (L → M → Q → H) จะเพิ่มความหนาแน่นของโค้ดประมาณ 7-15% สำหรับข้อมูลเดียวกัน QR Code จะดูซับซ้อนขึ้น แต่ใช้พื้นที่ทางกายภาพเท่าเดิม' },
        { question: 'QR Code ที่เสียหาย 30% ยังสแกนได้หรือไม่?', answer: 'ได้ — หากคุณใช้การแก้ไขข้อผิดพลาด H (30%) โค้ดสามารถทนต่อการทำลาย ความสกปรก หรือการบดบังโมดูลได้ถึง 30% และยังสแกนได้อย่างถูกต้อง นี่คือเหตุผลที่ QR Code ได้รับชื่อเสียงว่า "ทำลายไม่ได้"' },
        { question: 'การแก้ไขข้อผิดพลาดทำงานอย่างไร?', answer: 'QR Code ใช้การแก้ไขข้อผิดพลาด Reed-Solomon — คณิตศาสตร์เดียวกับที่ใช้ใน CD, DVD และการสื่อสารผ่านดาวเทียม ตัวสร้าง QR เพิ่มข้อมูลซ้ำซ้อน (พาริตี้ไบต์) ให้กับข้อมูลที่เข้ารหัส เครื่องสแกนใช้ความซ้ำซ้อนนี้เพื่อสร้างชิ้นส่วนที่หายไปหรือเสียหายใหม่' }
      ]
    }
  }) as any,

  'how-to-add-logo-to-qr-code': byLocale({
    en: {
      title: 'How to Add a Logo to a QR Code (Without Breaking It)',
      description: 'Step-by-step guide to putting a logo in the center of a QR code. Size, error correction, contrast — everything you need for a scannable branded QR.',
      h1: 'How to Add a Logo to a QR Code (Without Breaking It)',
      meta: 'Tutorial · 5 min read',
      lede: 'A QR code with your logo in the middle looks 10x more professional. But too big a logo, or the wrong error correction level, and the code stops scanning. Here\'s how to do it right.',
      breadcrumb: 'Add logo to QR',
      bodyNote: undefined,
      faqItems: [
        { question: 'Will adding a logo break my QR code?', answer: 'Only if you cover too much of it. With H (30%) error correction, you can cover up to ~25% of the code area with a circular image in the center. With M (15%), keep the logo to ~10% or less.' },
        { question: 'Should the logo be square or circular?', answer: 'Circular logos work best because they have no sharp corners to interfere with the QR grid. If you have a square logo, either round its corners in your design tool or use a white circular background behind it.' },
        { question: 'What size should the logo be?', answer: 'The logo should be 20-25% of the QR code\'s width. For a 200px QR code, a 40-50px logo. For a 2cm code, the logo is 4-5mm. Too small and no one notices it; too big and the code stops scanning.' },
        { question: 'Should the logo have a white background?', answer: 'Yes. A white (or light) circle behind the logo dramatically improves scannability because it increases the contrast between the logo and the dark QR modules. Without it, dark logos blend into the dark modules and scanners struggle.' },
        { question: 'Can I add the logo after generating the QR code?', answer: 'Yes — download the code as SVG, then overlay your logo in Figma, Illustrator, or even PowerPoint. For PNG, you can use any image editor. We recommend doing it before printing rather than after, for consistent output.' }
      ]
    },
    cn: {
      title: '如何给二维码添加 Logo(同时保证可扫描)',
      description: '手把手教你在二维码中央加 Logo。尺寸、纠错、对比度 — 打造可扫描的品牌二维码所需的一切。',
      h1: '如何给二维码添加 Logo(同时保证可扫描)',
      meta: '教程 · 5 分钟阅读',
      lede: '中央带 Logo 的二维码看起来专业 10 倍。但 Logo 太大或纠错级别不对,二维码就无法扫描。下面教你如何正确操作。',
      breadcrumb: '添加 Logo',
      bodyNote: '提示:本文正文为英文。标题、FAQ、目录已翻译,正文将在后续更新中提供中文版本。',
      faqItems: [
        { question: '加 Logo 会让二维码扫不出来吗?', answer: '只有当遮挡面积太大时才会。用 H(30%)纠错级别,你可以在中央用圆形图片覆盖最多约 25% 的面积。用 M(15%)时,Logo 控制在 10% 以下。' },
        { question: 'Logo 应该是方形还是圆形?', answer: '圆形 Logo 效果最好,因为它没有尖角去干扰二维码网格。如果你的 Logo 是方形的,要么在设计工具里把角磨圆,要么在后面加一个白色圆形背景。' },
        { question: 'Logo 应该多大?', answer: 'Logo 应占二维码宽度的 20-25%。200px 的二维码,Logo 是 40-50px;2cm 的二维码,Logo 是 4-5mm。太小没人注意到,太大二维码扫不出。' },
        { question: 'Logo 后面要加白色背景吗?', answer: '要。在 Logo 后面加一个白色(或浅色)圆形能大幅提高可扫描性,因为它能提高 Logo 与深色二维码模块之间的对比度。否则深色 Logo 会融入深色模块,扫描器会读不出来。' },
        { question: '可以在生成二维码后再加 Logo 吗?', answer: '可以 — 把二维码下载为 SVG,然后在 Figma、Illustrator 甚至 PowerPoint 里叠加 Logo。如果是 PNG,任何图片编辑器都可以。建议在打印前做好,而不是印后再加,以保证输出一致。' }
      ]
    },
    th: {
      title: 'วิธีเพิ่มโลโก้ลงใน QR Code (โดยไม่ทำให้สแกนไม่ได้)',
      description: 'คำแนะนำทีละขั้นตอนในการวางโลโก้ตรงกลาง QR Code ขนาด การแก้ไขข้อผิดพลาด ความคมชัด — ทุกสิ่งที่คุณต้องการเพื่อ QR Code แบรนด์ที่สแกนได้',
      h1: 'วิธีเพิ่มโลโก้ลงใน QR Code (โดยไม่ทำให้สแกนไม่ได้)',
      meta: 'บทช่วยสอน · อ่าน 5 นาที',
      lede: 'QR Code ที่มีโลโก้อยู่ตรงกลางดูเป็นมืออาชีพมากขึ้น 10 เท่า แต่ถ้าโลโก้ใหญ่เกินไป หรือระดับการแก้ไขข้อผิดพลาดผิด โค้ดจะหยุดสแกน นี่คือวิธีทำอย่างถูกต้อง',
      breadcrumb: 'เพิ่มโลโก้ใน QR',
      bodyNote: 'หมายเหตุ: เนื้อหาบทความเป็นภาษาอังกฤษ ชื่อบทความ คำถามที่พบบ่อย และสารบัญได้รับการแปลแล้ว เนื้อหาฉบับเต็มจะมีเวอร์ชันภาษาไทยในเร็วๆ นี้',
      faqItems: [
        { question: 'การเพิ่มโลโก้จะทำให้ QR Code ของฉันเสียหายหรือไม่?', answer: 'เฉพาะเมื่อคุณบังมากเกินไป ด้วยการแก้ไขข้อผิดพลาด H (30%) คุณสามารถบังพื้นที่โค้ดได้ถึง ~25% ด้วยภาพวงกลมตรงกลาง ด้วย M (15%) ให้ใช้โลโก้ไม่เกิน ~10%' },
        { question: 'โลโก้ควรเป็นสี่เหลี่ยมหรือวงกลม?', answer: 'โลโก้วงกลมทำงานได้ดีที่สุดเพราะไม่มีมุมแหลมที่จะรบกวนตาราง QR หากคุณมีโลโก้สี่เหลี่ยม ให้มุมมนในเครื่องมือออกแบบของคุณ หรือใช้พื้นหลังวงกลมสีขาวอยู่ด้านหลัง' },
        { question: 'โลโก้ควรมีขนาดเท่าไหร่?', answer: 'โลโก้ควรมีขนาด 20-25% ของความกว้าง QR Code สำหรับ QR Code 200px โลโก้ควรมีขนาด 40-50px สำหรับโค้ด 2cm โลโก้มีขนาด 4-5mm เล็กเกินไปจะไม่มีใครสังเกตเห็น ใหญ่เกินไปโค้ดจะหยุดสแกน' },
        { question: 'โลโก้ควรมีพื้นหลังสีขาวหรือไม่?', answer: 'ควร วงกลมสีขาว (หรือสีอ่อน) ด้านหลังโลโก้ช่วยเพิ่มความสามารถในการสแกนได้อย่างมาก เพราะเพิ่มความคมชัดระหว่างโลโก้กับโมดูล QR สีเข้ม หากไม่มี โลโก้สีเข้มจะกลมกลืนกับโมดูลสีเข้มและเครื่องสแกนจะมีปัญหา' },
        { question: 'ฉันสามารถเพิ่มโลโก้หลังจากสร้าง QR Code แล้วได้หรือไม่?', answer: 'ได้ — ดาวน์โหลดโค้ดเป็น SVG แล้วซ้อนโลโก้ของคุณใน Figma, Illustrator หรือแม้แต่ PowerPoint สำหรับ PNG คุณสามารถใช้โปรแกรมแก้ไขภาพใดก็ได้ เราแนะนำให้ทำก่อนพิมพ์มากกว่าหลัง เพื่อให้ผลลัพธ์สม่ำเสมอ' }
      ]
    }
  }) as any,

  'static-vs-dynamic-qr-codes': byLocale({
    en: {
      title: 'Static vs Dynamic QR Codes: What\'s the Difference?',
      description: 'Static or dynamic? Free or subscription? When each makes sense. Privacy and reliability trade-offs compared.',
      h1: 'Static vs Dynamic QR Codes: What\'s the Difference?',
      meta: 'Comparison · 4 min read',
      lede: 'There are two kinds of QR codes, and they have very different implications for privacy, cost, and reliability. Most people don\'t realize which one they\'re using.',
      breadcrumb: 'Static vs dynamic',
      bodyNote: undefined,
      faqItems: [
        { question: 'Can I edit a static QR code after printing?', answer: 'No. A static QR code encodes the destination data directly. Once printed, the data is fixed. To change it, you must generate and redistribute a new code.' },
        { question: 'Do dynamic QR codes work without internet?', answer: 'No. Dynamic QR codes encode only a short redirect URL. The phone must connect to the redirect server to fetch the final destination. No internet, no scan.' },
        { question: 'Are dynamic QR codes worth the monthly fee?', answer: 'Only if you need the tracking data or plan to change destinations frequently. For one-time campaigns (event posters, packaging, business cards), static codes are free, faster, and more reliable. Dynamic codes earn their subscription when you have hundreds of codes in the field.' },
        { question: 'Can dynamic QR codes expire if the company shuts down?', answer: 'Yes — this is a real risk. If the company running the redirect service goes out of business, all your dynamic codes become dead links. Static codes have no such dependency.' },
        { question: 'Which is more private?', answer: 'Static is more private: nothing is tracked by default. Dynamic QR services inherently log every scan (that\'s how their analytics work). For privacy-conscious use cases, static is the better choice.' }
      ]
    },
    cn: {
      title: '静态二维码 vs 动态二维码:有什么区别?',
      description: '静态还是动态?免费还是订阅?各自的适用场景,以及隐私与可靠性的取舍。',
      h1: '静态二维码 vs 动态二维码:有什么区别?',
      meta: '对比 · 4 分钟阅读',
      lede: '二维码分两种,它们在隐私、成本、可靠性上有截然不同的影响。多数人没意识到自己用的是哪一种。',
      breadcrumb: '静态 vs 动态',
      bodyNote: '提示:本文正文为英文。标题、FAQ、目录已翻译,正文将在后续更新中提供中文版本。',
      faqItems: [
        { question: '打印后能修改静态二维码吗?', answer: '不能。静态二维码直接把目标数据编进了码里。一旦打印,数据就固定了。要修改必须重新生成并重新分发。' },
        { question: '动态二维码不联网能用吗?', answer: '不能。动态二维码只编码一个短跳转 URL。手机必须连到跳转服务器去取最终目标。断网,就扫不出。' },
        { question: '动态二维码的月费值得吗?', answer: '只有当你需要追踪数据或频繁更换目标时才值得。对于一次性活动(活动海报、包装、名片),静态二维码免费、更快、更可靠。当你需要在现场管理几百个码时,动态二维码才值回订阅费。' },
        { question: '动态二维码会因公司倒闭而失效吗?', answer: '会 — 这是真实存在的风险。如果提供跳转服务的公司倒闭,你所有的动态二维码都会变成死链。静态二维码没有这个依赖。' },
        { question: '哪个更私密?', answer: '静态更私密:默认无任何追踪。动态二维码服务本质上会记录每次扫描(这是它们分析功能的工作方式)。对注重隐私的场景,静态是更好的选择。' }
      ]
    },
    th: {
      title: 'QR Code แบบ Static vs Dynamic: ต่างกันอย่างไร?',
      description: 'Static หรือ Dynamic? ฟรีหรือสมัครสมาชิก? เมื่อใดควรใช้แบบใด เปรียบเทียบข้อดีข้อเสียด้านความเป็นส่วนตัวและความน่าเชื่อถือ',
      h1: 'QR Code แบบ Static vs Dynamic: ต่างกันอย่างไร?',
      meta: 'การเปรียบเทียบ · อ่าน 4 นาที',
      lede: 'มี QR Code สองประเภท และมีผลกระทบที่แตกต่างกันมากต่อความเป็นส่วนตัว ต้นทุน และความน่าเชื่อถือ คนส่วนใหญ่ไม่รู้ว่ากำลังใช้แบบใด',
      breadcrumb: 'Static vs Dynamic',
      bodyNote: 'หมายเหตุ: เนื้อหาบทความเป็นภาษาอังกฤษ ชื่อบทความ คำถามที่พบบ่อย และสารบัญได้รับการแปลแล้ว เนื้อหาฉบับเต็มจะมีเวอร์ชันภาษาไทยในเร็วๆ นี้',
      faqItems: [
        { question: 'ฉันสามารถแก้ไข QR Code แบบ Static หลังจากพิมพ์ได้หรือไม่?', answer: 'ไม่ได้ QR Code แบบ Static เข้ารหัสข้อมูลปลายทางโดยตรง เมื่อพิมพ์แล้ว ข้อมูลจะถูกกำหนด หากต้องการเปลี่ยน คุณต้องสร้างและแจกจ่ายโค้ดใหม่' },
        { question: 'QR Code แบบ Dynamic ทำงานโดยไม่มีอินเทอร์เน็ตได้หรือไม่?', answer: 'ไม่ได้ QR Code แบบ Dynamic เข้ารหัสเพียง URL เปลี่ยนเส้นทางแบบสั้น โทรศัพท์ต้องเชื่อมต่อกับเซิร์ฟเวอร์เปลี่ยนเส้นทางเพื่อดึงปลายทางสุดท้าย ไม่มีอินเทอร์เน็ต ไม่สามารถสแกนได้' },
        { question: 'QR Code แบบ Dynamic คุ้มกับค่าธรรมเนียมรายเดือนหรือไม่?', answer: 'คุ้มเฉพาะเมื่อคุณต้องการข้อมูลการติดตามหรือวางแผนที่จะเปลี่ยนปลายทางบ่อยๆ สำหรับแคมเปญครั้งเดียว (โปสเตอร์กิจกรรม บรรจุภัณฑ์ นามบัตร) โค้ดแบบ Static ฟรี เร็วกว่า และเชื่อถือได้มากกว่า โค้ดแบบ Dynamic คุ้มค่าสมัครสมาชิกเมื่อคุณมีโค้ดหลายร้อยตัวในสนาม' },
        { question: 'QR Code แบบ Dynamic จะหมดอายุหากบริษัทปิดตัวลงหรือไม่?', answer: 'ได้ — นี่เป็นความเสี่ยงจริง หากบริษัทที่ให้บริการเปลี่ยนเส้นทางปิดกิจการ QR Code แบบ Dynamic ทั้งหมดของคุณจะกลายเป็นลิงก์ที่ตายแล้ว โค้ดแบบ Static ไม่มีการพึ่งพาแบบนี้' },
        { question: 'แบบใดเป็นส่วนตัวมากกว่า?', answer: 'Static เป็นส่วนตัวมากกว่า: ไม่มีการติดตามโดยค่าเริ่มต้น บริการ QR แบบ Dynamic จะบันทึกการสแกนทุกครั้งโดยธรรมชาติ (นี่คือวิธีการทำงานของการวิเคราะห์) สำหรับกรณีการใช้งานที่ใส่ใจเรื่องความเป็นส่วนตัว Static เป็นตัวเลือกที่ดีกว่า' }
      ]
    }
  }) as any,

  'qr-code-printing-size-guide': byLocale({
    en: {
      title: 'QR Code Printing Size Guide: Minimum Sizes & Best Practices',
      description: 'What\'s the smallest QR code you can print? How big should it be for poster, business card, or billboard? Print DPI, quiet zones, and distance rules.',
      h1: 'QR Code Printing Size Guide: Minimum Sizes & Best Practices',
      meta: 'Reference · 5 min read',
      lede: 'A QR code too small won\'t scan. A QR code too big wastes space. Here\'s the exact size you need for every common use case — and the print settings that make it work.',
      breadcrumb: 'Printing size guide',
      bodyNote: undefined,
      faqItems: [
        { question: 'What is the smallest QR code that still scans?', answer: 'A QR code smaller than about 1cm × 1cm (0.4 inches) is hard to scan with a phone camera, regardless of the data it contains. Below 0.5cm, most scanners fail. Aim for at least 1.5-2cm for short URLs.' },
        { question: 'Does print size depend on the scan distance?', answer: 'Yes. As a rule of thumb, the QR code width should be at least 1/10th of the scan distance. A code meant to be scanned from 1 meter away should be at least 10cm wide. From 5 meters away: at least 50cm.' },
        { question: 'What DPI should I print at?', answer: 'For print, 300 DPI is standard. Export your QR code as SVG (vector) to print at any size without quality loss. If you must use PNG, export at 600+ DPI for the final print size.' },
        { question: 'Can I print a QR code on fabric or curved surfaces?', answer: 'Yes, but test first. Curved surfaces (water bottles, mugs) reduce scannability because the code distorts. Use H error correction and test on the actual object. Embroidery on fabric works but requires a high-resolution version and H error correction.' },
        { question: 'How much white space do I need around the QR code?', answer: 'A "quiet zone" of at least 4 modules of white space around all sides. For a 2cm QR code, that means at least 0.5cm of empty white space on each side. Without this margin, scanners often fail.' }
      ]
    },
    cn: {
      title: '二维码印刷尺寸指南:最小尺寸与最佳实践',
      description: '二维码最小能印多大?海报、名片、广告牌分别该多大?印刷 DPI、静区、距离规则全解析。',
      h1: '二维码印刷尺寸指南:最小尺寸与最佳实践',
      meta: '参考 · 5 分钟阅读',
      lede: '二维码印小了扫不出,印大了浪费版面。每种常见场景的合适尺寸,以及让它正常工作的印刷设置,全在这里。',
      breadcrumb: '印刷尺寸指南',
      bodyNote: '提示:本文正文为英文。标题、FAQ、目录已翻译,正文将在后续更新中提供中文版本。',
      faqItems: [
        { question: '多小的二维码还能扫?', answer: '小于约 1cm × 1cm(0.4 英寸)的二维码,无论内容是什么,手机相机都很难扫。低于 0.5cm 大多数扫描器会失败。短网址建议至少 1.5-2cm。' },
        { question: '印刷尺寸与扫描距离有关吗?', answer: '有关。经验法则是:二维码宽度至少是扫描距离的 1/10。1 米外扫,二维码至少 10cm 宽;5 米外扫,至少 50cm。' },
        { question: '印刷应该用多少 DPI?', answer: '印刷标准是 300 DPI。建议把二维码导出为 SVG(矢量),任意尺寸都无质量损失。必须用 PNG 时,按最终印刷尺寸导出 600+ DPI。' },
        { question: '二维码能印在布料或曲面上吗?', answer: '可以,但要先测试。曲面(水杯、马克杯)会因为扭曲而降低可扫描性。用 H 纠错级别,并在实际物品上测试。布料绣花也行,但需要高分辨率版本和 H 纠错。' },
        { question: '二维码周围要留多少白边?', answer: '"静区" — 四周至少留 4 个模块的白色空间。2cm 的二维码,每边要至少 0.5cm 空白。没有这个边距,扫描器经常会失败。' }
      ]
    },
    th: {
      title: 'คำแนะนำขนาดการพิมพ์ QR Code: ขนาดเล็กที่สุดและแนวปฏิบัติที่ดีที่สุด',
      description: 'QR Code ที่เล็กที่สุดที่พิมพ์ได้คือเท่าไหร่? ควรมีขนาดเท่าไหร่สำหรับโปสเตอร์ นามบัตร หรือป้ายโฆษณา? กฎ DPI การพิมพ์ โซนเงียบ และระยะ',
      h1: 'คำแนะนำขนาดการพิมพ์ QR Code: ขนาดเล็กที่สุดและแนวปฏิบัติที่ดีที่สุด',
      meta: 'ข้อมูลอ้างอิง · อ่าน 5 นาที',
      lede: 'QR Code ที่เล็กเกินไปจะสแกนไม่ได้ QR Code ที่ใหญ่เกินไปเปลืองพื้นที่ นี่คือขนาดที่แน่นอนที่คุณต้องการสำหรับกรณีการใช้งานทั่วไปทุกกรณี — และการตั้งค่าการพิมพ์ที่ทำให้มันใช้งานได้',
      breadcrumb: 'คำแนะนำขนาดการพิมพ์',
      bodyNote: 'หมายเหตุ: เนื้อหาบทความเป็นภาษาอังกฤษ ชื่อบทความ คำถามที่พบบ่อย และสารบัญได้รับการแปลแล้ว เนื้อหาฉบับเต็มจะมีเวอร์ชันภาษาไทยในเร็วๆ นี้',
      faqItems: [
        { question: 'QR Code ที่เล็กที่สุดที่ยังสแกนได้คือเท่าไหร่?', answer: 'QR Code ที่เล็กกว่าประมาณ 1cm × 1cm (0.4 นิ้ว) จะสแกนได้ยากด้วยกล้องโทรศัพท์ ไม่ว่าจะมีข้อมูลอะไรก็ตาม ต่ำกว่า 0.5cm เครื่องสแกนส่วนใหญ่จะล้มเหลว ตั้งเป้าขนาดอย่างน้อย 1.5-2cm สำหรับ URL สั้น' },
        { question: 'ขนาดการพิมพ์ขึ้นอยู่กับระยะการสแกนหรือไม่?', answer: 'ขึ้นอยู่ กฎง่ายๆ คือ ความกว้างของ QR Code ควรมีอย่างน้อย 1/10 ของระยะการสแกน โค้ดที่ตั้งใจให้สแกนจากระยะ 1 เมตร ควรมีความกว้างอย่างน้อย 10 ซม. จากระยะ 5 เมตร: อย่างน้อย 50 ซม.' },
        { question: 'ควรพิมพ์ที่ DPI เท่าไหร่?', answer: 'สำหรับการพิมพ์ 300 DPI เป็นมาตรฐาน ส่งออก QR Code ของคุณเป็น SVG (เวกเตอร์) เพื่อพิมพ์ทุกขนาดโดยไม่สูญเสียคุณภาพ หากคุณต้องใช้ PNG ให้ส่งออกที่ 600+ DPI สำหรับขนาดการพิมพ์สุดท้าย' },
        { question: 'ฉันสามารถพิมพ์ QR Code บนผ้าหรือพื้นผิวโค้งได้หรือไม่?', answer: 'ได้ แต่ต้องทดสอบก่อน พื้นผิวโค้ง (ขวดน้ำ แก้ว) ลดความสามารถในการสแกนเพราะโค้ดบิดเบือน ใช้การแก้ไขข้อผิดพลาด H และทดสอบบนวัตถุจริง การปักบนผ้าใช้ได้แต่ต้องใช้เวอร์ชันความละเอียดสูงและการแก้ไขข้อผิดพลาด H' },
        { question: 'ฉันต้องเว้นพื้นที่สีขาวรอบ QR Code เท่าไหร่?', answer: '"โซนเงียบ" อย่างน้อย 4 โมดูลของพื้นที่สีขาวรอบทุกด้าน สำหรับ QR Code 2cm หมายความว่าต้องมีพื้นที่ว่างสีขาวอย่างน้อย 0.5cm ในแต่ละด้าน หากไม่มีระยะขอบนี้ เครื่องสแกนมักจะล้มเหลว' }
      ]
    }
  }) as any
};

export function getBlogPost(slug: string, locale: Locale): BlogPostI18n {
  const entry = blogPosts[slug];
  if (!entry) {
    // Should never happen — but fall back to en with a sane placeholder
    return {
      title: slug,
      description: '',
      h1: slug,
      meta: '',
      lede: '',
      breadcrumb: slug,
      faqItems: []
    };
  }
  return entry[locale] ?? entry.en;
}

// Shared "common blog UI" strings, per-locale.
export const blogChrome: Record<Locale, { home: string; blog: string; faqHeading: string; tryItNow: string; readMore: string; }> = {
  en: { home: 'Home', blog: 'Blog', faqHeading: 'Frequently asked questions', tryItNow: 'Try it now', readMore: 'Read more →' },
  cn: { home: '首页', blog: '博客', faqHeading: '常见问题', tryItNow: '立即试试', readMore: '阅读全文 →' },
  th: { home: 'หน้าแรก', blog: 'บล็อก', faqHeading: 'คำถามที่พบบ่อย', tryItNow: 'ลองเลยตอนนี้', readMore: 'อ่านต่อ →' }
};
