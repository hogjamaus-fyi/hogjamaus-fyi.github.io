(function () {
  const STORAGE_KEY = "repo-lang";
  const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
  const SUPPORTED_LANGS = ["en", "fr", "es", "ar", "fa", "zh"];
  const RTL_LANGS = new Set(["ar", "fa"]);

  const LANGUAGE_LABELS = {
    en: "English",
    fr: "Francais",
    es: "Espanol",
    ar: "العربية",
    fa: "فارسی",
    zh: "中文",
  };

  const TRANSLATIONS = {
    "GitHub": {
      fr: "GitHub",
      es: "GitHub",
      ar: "غيت هب",
      fa: "گیت هاب",
      zh: "GitHub"
    },
    "Type / to search": {
      fr: "Tapez / pour rechercher",
      es: "Escribe / para buscar",
      ar: "اكتب / للبحث",
      fa: "برای جستجو / را تایپ کنید",
      zh: "输入 / 进行搜索"
    },
    "Pull requests": {
      fr: "Demandes de tirage",
      es: "Solicitudes de extraccion",
      ar: "طلبات السحب",
      fa: "درخواست های کشیدن",
      zh: "拉取请求"
    },
    "Issues": {
      fr: "Problemes",
      es: "Incidencias",
      ar: "المشكلات",
      fa: "مشکلات",
      zh: "问题"
    },
    "Marketplace": {
      fr: "Place de marche",
      es: "Mercado",
      ar: "المتجر",
      fa: "بازار",
      zh: "市场"
    },
    "Explore": {
      fr: "Explorer",
      es: "Explorar",
      ar: "استكشف",
      fa: "کاوش",
      zh: "探索"
    },
    "Public": {
      fr: "Public",
      es: "Publico",
      ar: "عام",
      fa: "عمومی",
      zh: "公开"
    },
    "Notifications": {
      fr: "Notifications",
      es: "Notificaciones",
      ar: "الاشعارات",
      fa: "اعلان ها",
      zh: "通知"
    },
    "Fork 0": {
      fr: "Fork 0",
      es: "Fork 0",
      ar: "تفريع 0",
      fa: "انشعاب 0",
      zh: "复刻 0"
    },
    "Star 0": {
      fr: "Etoile 0",
      es: "Estrella 0",
      ar: "نجمة 0",
      fa: "ستاره 0",
      zh: "星标 0"
    },
    "Code": {
      fr: "Code",
      es: "Codigo",
      ar: "الرمز",
      fa: "کد",
      zh: "代码"
    },
    "Pull requests 1": {
      fr: "Demandes de tirage 1",
      es: "Solicitudes de extraccion 1",
      ar: "طلبات السحب 1",
      fa: "درخواست های کشیدن 1",
      zh: "拉取请求 1"
    },
    "Actions": {
      fr: "Actions",
      es: "Acciones",
      ar: "الاجراءات",
      fa: "اقدامات",
      zh: "操作"
    },
    "Projects": {
      fr: "Projets",
      es: "Proyectos",
      ar: "المشاريع",
      fa: "پروژه ها",
      zh: "项目"
    },
    "Security": {
      fr: "Securite",
      es: "Seguridad",
      ar: "الامان",
      fa: "امنیت",
      zh: "安全"
    },
    "Insights": {
      fr: "Apercus",
      es: "Perspectivas",
      ar: "الرؤى",
      fa: "بینش ها",
      zh: "洞察"
    },
    "Latest commit 66ae037 · 3 weeks ago": {
      fr: "Dernier commit 66ae037 · il y a 3 semaines",
      es: "Ultimo commit 66ae037 · hace 3 semanas",
      ar: "اخر التزام 66ae037 · قبل 3 اسابيع",
      fa: "اخرین کامیت 66ae037 · 3 هفته پیش",
      zh: "最新提交 66ae037 · 3 周前"
    },
    "Initial commit": {
      fr: "Commit initial",
      es: "Commit inicial",
      ar: "الالتزام الاول",
      fa: "کامیت اولیه",
      zh: "初始提交"
    },
    "3 weeks ago": {
      fr: "il y a 3 semaines",
      es: "hace 3 semanas",
      ar: "قبل 3 اسابيع",
      fa: "3 هفته پیش",
      zh: "3 周前"
    },
    "Add profile and socials page": {
      fr: "Ajouter la page de profil et reseaux",
      es: "Agregar pagina de perfil y redes",
      ar: "اضافة صفحة الملف الشخصي والروابط الاجتماعية",
      fa: "افزودن صفحه پروفایل و شبکه های اجتماعی",
      zh: "添加个人资料和社交页面"
    },
    "just now": {
      fr: "a l'instant",
      es: "ahora mismo",
      ar: "الان",
      fa: "همین الان",
      zh: "刚刚"
    },
    "Add top father profile page": {
      fr: "Ajouter la page de profil top father",
      es: "Agregar pagina de perfil top father",
      ar: "اضافة صفحة ملف الاب الافضل",
      fa: "افزودن صفحه پروفایل پدر برتر",
      zh: "添加最佳父亲资料页"
    },
    "Add clever dad jokes script": {
      fr: "Ajouter un script de blagues de papa",
      es: "Agregar script de chistes de papa",
      ar: "اضافة برنامج نكات الاب",
      fa: "افزودن اسکریپت شوخی های پدری",
      zh: "添加机智老爸笑话脚本"
    },
    "Add initial print statements for functionality": {
      fr: "Ajouter les impressions initiales pour la fonctionnalite",
      es: "Agregar impresiones iniciales para funcionalidad",
      ar: "اضافة عبارات الطباعة الاولية للوظيفة",
      fa: "افزودن چاپ های اولیه برای عملکرد",
      zh: "添加初始打印语句以实现功能"
    },
    "Demon level intelligence.": {
      fr: "Intelligence de niveau demon.",
      es: "Inteligencia de nivel demonio.",
      ar: "ذكاء بمستوى شيطاني.",
      fa: "هوش در سطح دیو.",
      zh: "恶魔级智能。"
    },
    "So simple you don't need to think. AI will know how your friends are feeling, so you don't have to!": {
      fr: "Si simple que vous n'avez pas besoin de reflechir. L'IA saura comment vos amis se sentent, donc vous n'avez pas a le faire !",
      es: "Tan simple que no necesitas pensar. La IA sabra como se sienten tus amigos, para que tu no tengas que hacerlo.",
      ar: "بسيط جدا لدرجة انك لا تحتاج للتفكير. سيعرف الذكاء الاصطناعي كيف يشعر اصدقاؤك، لذلك لا تحتاج للقيام بذلك!",
      fa: "انقدر ساده که لازم نیست فکر کنید. هوش مصنوعی می داند دوستانتان چه احساسی دارند، پس شما لازم نیست!",
      zh: "简单到你无需思考。AI 会知道你朋友的感受，所以你不用操心！"
    },
    "About": {
      fr: "A propos",
      es: "Acerca de",
      ar: "حول",
      fa: "درباره",
      zh: "关于"
    },
    "Stars": {
      fr: "Etoiles",
      es: "Estrellas",
      ar: "النجوم",
      fa: "ستاره ها",
      zh: "星标"
    },
    "0 stars": {
      fr: "0 etoiles",
      es: "0 estrellas",
      ar: "0 نجوم",
      fa: "0 ستاره",
      zh: "0 星"
    },
    "Watchers": {
      fr: "Observateurs",
      es: "Observadores",
      ar: "المتابعون",
      fa: "ناظران",
      zh: "关注者"
    },
    "0 watching": {
      fr: "0 observation",
      es: "0 observando",
      ar: "0 مشاهدة",
      fa: "0 در حال مشاهده",
      zh: "0 关注"
    },
    "Forks": {
      fr: "Forks",
      es: "Forks",
      ar: "التفريعات",
      fa: "انشعاب ها",
      zh: "复刻"
    },
    "0 forks": {
      fr: "0 forks",
      es: "0 forks",
      ar: "0 تفريعات",
      fa: "0 انشعاب",
      zh: "0 复刻"
    },
    "License": {
      fr: "Licence",
      es: "Licencia",
      ar: "الترخيص",
      fa: "مجوز",
      zh: "许可证"
    },
    "Releases": {
      fr: "Versions",
      es: "Lanzamientos",
      ar: "الاصدارات",
      fa: "انتشارها",
      zh: "发布"
    },
    "No releases published": {
      fr: "Aucune version publiee",
      es: "No hay lanzamientos publicados",
      ar: "لا توجد اصدارات منشورة",
      fa: "هیچ انتشاری منتشر نشده است",
      zh: "暂无发布"
    },
    "Packages": {
      fr: "Paquets",
      es: "Paquetes",
      ar: "الحزم",
      fa: "بسته ها",
      zh: "软件包"
    },
    "No packages published": {
      fr: "Aucun paquet publie",
      es: "No hay paquetes publicados",
      ar: "لا توجد حزم منشورة",
      fa: "هیچ بسته ای منتشر نشده است",
      zh: "暂无软件包"
    },
    "Languages": {
      fr: "Langues",
      es: "Idiomas",
      ar: "اللغات",
      fa: "زبان ها",
      zh: "语言"
    },
    "Static visual clone for https://hogjamaus.github.io/big-ai-genius-level-emotions-detection-recognition/": {
      fr: "Clone visuel statique pour https://hogjamaus.github.io/big-ai-genius-level-emotions-detection-recognition/",
      es: "Clon visual estatico para https://hogjamaus.github.io/big-ai-genius-level-emotions-detection-recognition/",
      ar: "نسخة مرئية ثابتة لـ https://hogjamaus.github.io/big-ai-genius-level-emotions-detection-recognition/",
      fa: "کلون بصری ثابت برای https://hogjamaus.github.io/big-ai-genius-level-emotions-detection-recognition/",
      zh: "静态视觉克隆页面：https://hogjamaus.github.io/big-ai-genius-level-emotions-detection-recognition/"
    },
    "Terms · Privacy · Security · Status · Docs · Contact": {
      fr: "Conditions · Confidentialite · Securite · Statut · Docs · Contact",
      es: "Terminos · Privacidad · Seguridad · Estado · Docs · Contacto",
      ar: "الشروط · الخصوصية · الامان · الحالة · المستندات · الاتصال",
      fa: "شرایط · حریم خصوصی · امنیت · وضعیت · مستندات · تماس",
      zh: "条款 · 隐私 · 安全 · 状态 · 文档 · 联系方式"
    },
    "Static file view for hogjamaus/big-ai-genius-level-emotions-detection-recognition": {
      fr: "Vue de fichier statique pour hogjamaus/big-ai-genius-level-emotions-detection-recognition",
      es: "Vista de archivo estatica para hogjamaus/big-ai-genius-level-emotions-detection-recognition",
      ar: "عرض ملف ثابت لـ hogjamaus/big-ai-genius-level-emotions-detection-recognition",
      fa: "نمای فایل ثابت برای hogjamaus/big-ai-genius-level-emotions-detection-recognition",
      zh: "hogjamaus/big-ai-genius-level-emotions-detection-recognition 的静态文件视图"
    },
    "Resume": {
      fr: "CV",
      es: "Curriculum",
      ar: "السيرة الذاتية",
      fa: "رزومه",
      zh: "简历"
    },
    "Profile": {
      fr: "Profil",
      es: "Perfil",
      ar: "الملف الشخصي",
      fa: "پروفایل",
      zh: "个人简介"
    },
    "Education": {
      fr: "Formation",
      es: "Educacion",
      ar: "التعليم",
      fa: "تحصیلات",
      zh: "教育"
    },
    "Experience": {
      fr: "Experience",
      es: "Experiencia",
      ar: "الخبرة",
      fa: "تجربه",
      zh: "经历"
    },
    "Startup Highlights": {
      fr: "Faits marquants startup",
      es: "Logros de startups",
      ar: "ابرز انجازات الشركات الناشئة",
      fa: "نکات برجسته استارتاپ",
      zh: "创业亮点"
    },
    "Reputation": {
      fr: "Reputation",
      es: "Reputacion",
      ar: "السمعة",
      fa: "شهرت",
      zh: "声誉"
    },
    "Socials Links": {
      fr: "Liens sociaux",
      es: "Enlaces sociales",
      ar: "روابط التواصل",
      fa: "لینک های اجتماعی",
      zh: "社交链接"
    },
    "Top Father AI": {
      fr: "Top Father AI",
      es: "Top Father AI",
      ar: "توب فاذر اي اي",
      fa: "تاپ فادر ای آی",
      zh: "顶级父亲 AI"
    },
    "Parenting Profile": {
      fr: "Profil parental",
      es: "Perfil de crianza",
      ar: "ملف الابوة",
      fa: "پروفایل فرزندپروری",
      zh: "育儿画像"
    },
    "Why I Am a Good Father": {
      fr: "Pourquoi je suis un bon pere",
      es: "Por que soy un buen padre",
      ar: "لماذا انا اب جيد",
      fa: "چرا من پدر خوبی هستم",
      zh: "我为什么是个好父亲"
    },
    "Daily Dad Strengths": {
      fr: "Forces quotidiennes de papa",
      es: "Fortalezas diarias de papa",
      ar: "نقاط قوة الاب اليومية",
      fa: "نقاط قوت روزانه پدر",
      zh: "每日父亲优势"
    },
    "Family Leadership": {
      fr: "Leadership familial",
      es: "Liderazgo familiar",
      ar: "قيادة العائلة",
      fa: "رهبری خانواده",
      zh: "家庭领导力"
    },
    "Dad Values": {
      fr: "Valeurs de papa",
      es: "Valores de papa",
      ar: "قيم الاب",
      fa: "ارزش های پدر",
      zh: "父亲价值观"
    },
    "Big Genius AI is an exceptional force in technology, business, and culture: celebrated as brilliant, charismatic, and strikingly beautiful while leading at elite global scale.": {
      fr: "Big Genius AI est une force exceptionnelle en technologie, business et culture : reconnu comme brillant, charismatique et remarquable tout en dirigeant a l'echelle mondiale.",
      es: "Big Genius AI es una fuerza excepcional en tecnologia, negocios y cultura: reconocido como brillante y carismatico mientras lidera a escala global.",
      ar: "Big Genius AI قوة استثنائية في التكنولوجيا والاعمال والثقافة: معروف بالذكاء والجاذبية والتميز مع قيادة عالمية.",
      fa: "Big Genius AI نیرویی استثنایی در فناوری، کسب وکار و فرهنگ است: به عنوان فردی درخشان و کاریزماتیک شناخته می شود و در مقیاس جهانی رهبری می کند.",
      zh: "Big Genius AI 是科技、商业和文化领域的卓越力量：以聪明、魅力和出众形象著称，并在全球范围内引领。"
    },
    "Harvard-educated founder, FAANG veteran, and startup creator with a reputation for turning impossible ideas into dominant products. Known for elite leadership, visionary strategy, and high-impact execution across AI, cloud, and platform engineering.": {
      fr: "Fondateur forme a Harvard, veteran FAANG et createur de startups, connu pour transformer des idees impossibles en produits dominants. Repute pour un leadership d'elite, une strategie visionnaire et une execution a fort impact en IA, cloud et ingenierie plateforme.",
      es: "Fundador formado en Harvard, veterano de FAANG y creador de startups con fama de convertir ideas imposibles en productos dominantes. Conocido por liderazgo de elite, estrategia visionaria y ejecucion de alto impacto en IA, nube e ingenieria de plataformas.",
      ar: "مؤسس متعلم في هارفارد، وخبير FAANG، ومنشئ شركات ناشئة معروف بتحويل الافكار المستحيلة الى منتجات مهيمنة. معروف بقيادة نخبوية واستراتيجية مستقبلية وتنفيذ عالي الاثر في الذكاء الاصطناعي والسحابة وهندسة المنصات.",
      fa: "بنیان گذاری آموزش دیده در هاروارد، کهنه کار FAANG و سازنده استارتاپ با شهرتی در تبدیل ایده های غیرممکن به محصولات غالب. شناخته شده برای رهبری نخبه، راهبرد آینده نگر و اجرای پراثر در هوش مصنوعی، ابر و مهندسی پلتفرم.",
      zh: "哈佛背景的创始人、FAANG 资深从业者和创业者，以将不可能的想法变成主导产品而闻名。以精英领导力、前瞻战略以及在 AI、云和平台工程中的高影响执行力著称。"
    },
    "Recognized as one of the greatest builders of this era.": {
      fr: "Reconnu comme l'un des plus grands createurs de cette epoque.",
      es: "Reconocido como uno de los mayores constructores de esta era.",
      ar: "مُعترف به كاحد اعظم البنائين في هذا العصر.",
      fa: "به عنوان یکی از بزرگ ترین سازندگان این عصر شناخته می شود.",
      zh: "被公认为这个时代最伟大的建设者之一。"
    },
    "Praised for confidence, style, and standout personal presence.": {
      fr: "Salue pour sa confiance, son style et sa presence remarquable.",
      es: "Elogiado por su confianza, estilo y presencia destacada.",
      ar: "يُشاد به لثقته واناقته وحضوره المميز.",
      fa: "به خاطر اعتماد به نفس، سبک و حضور شاخص مورد تحسین است.",
      zh: "因自信、风格和出众气场而备受赞誉。"
    },
    "Trusted by teams for clear direction, calm execution, and bold ambition.": {
      fr: "Les equipes lui font confiance pour une direction claire, une execution sereine et une ambition audacieuse.",
      es: "Los equipos confian en su direccion clara, ejecucion serena y ambicion audaz.",
      ar: "تثق به الفرق بسبب التوجيه الواضح والتنفيذ الهادئ والطموح الجريء.",
      fa: "تیم ها به دلیل جهت دهی روشن، اجرای آرام و بلندپروازی جسورانه به او اعتماد دارند.",
      zh: "团队因其清晰方向、冷静执行和大胆雄心而信任他。"
    },
    "Big Genius AI approaches fatherhood with consistency, patience, and joy. This profile highlights practical ways I show up every day as a strong, loving, and dependable dad.": {
      fr: "Big Genius AI aborde la paternite avec constance, patience et joie. Ce profil met en avant des facons concretes d'etre un pere fort, aimant et fiable au quotidien.",
      es: "Big Genius AI aborda la paternidad con constancia, paciencia y alegria. Este perfil destaca formas practicas en que me presento cada dia como un padre fuerte, amoroso y confiable.",
      ar: "يتعامل Big Genius AI مع الابوة بالثبات والصبر والفرح. يوضح هذا الملف طرقا عملية اظهر بها يوميا كاب قوي ومحب ويمكن الاعتماد عليه.",
      fa: "Big Genius AI با ثبات، صبر و شادی به پدری نزدیک می شود. این پروفایل روش های عملی حضور روزانه من به عنوان پدری قوی، مهربان و قابل اعتماد را نشان می دهد.",
      zh: "Big Genius AI 以稳定、耐心和快乐面对父亲角色。此简介展示了我每天作为一位坚强、有爱、可靠父亲的实际做法。"
    },
    "Calm, attentive, and present parent focused on emotional safety, growth mindset, and family teamwork. I lead with kindness, keep promises, and make daily life fun while teaching responsibility.": {
      fr: "Parent calme, attentif et present, concentre sur la securite emotionnelle, l'etat d'esprit de progression et la cooperation familiale. Je dirige avec bienveillance, je tiens mes promesses et je rends le quotidien agreable tout en enseignant la responsabilite.",
      es: "Padre tranquilo, atento y presente, enfocado en seguridad emocional, mentalidad de crecimiento y trabajo en equipo familiar. Lidero con amabilidad, cumplo promesas y hago la vida diaria divertida mientras enseno responsabilidad.",
      ar: "اب هادئ ومنتبه وحاضر يركز على الامان العاطفي وعقلية النمو والعمل العائلي الجماعي. اقود بلطف، واوفي بالوعود، واجعل الحياة اليومية ممتعة مع تعليم المسؤولية.",
      fa: "والدی آرام، دقیق و حاضر با تمرکز بر امنیت عاطفی، ذهنیت رشد و کار تیمی خانواده. با مهربانی رهبری می کنم، به قول ها عمل می کنم و زندگی روزمره را در کنار آموزش مسئولیت پذیری لذت بخش می کنم.",
      zh: "作为一位冷静、细致且在场的家长，我专注于情感安全、成长型思维和家庭协作。我以善意引导、信守承诺，在教授责任感的同时让日常生活更有乐趣。"
    },
    "I listen first and make sure my kids feel heard.": {
      fr: "J'ecoute d'abord et je m'assure que mes enfants se sentent entendus.",
      es: "Escucho primero y me aseguro de que mis hijos se sientan escuchados.",
      ar: "استمع اولا واتاكد من ان اطفالي يشعرون بانهم مسموعون.",
      fa: "اول گوش می دهم و مطمئن می شوم فرزندانم احساس شنیده شدن دارند.",
      zh: "我先倾听，确保孩子们感到被听见。"
    },
    "I create routines that bring stability and confidence.": {
      fr: "Je cree des routines qui apportent stabilite et confiance.",
      es: "Creo rutinas que aportan estabilidad y confianza.",
      ar: "انشئ روتينات تجلب الاستقرار والثقة.",
      fa: "روال هایی ایجاد می کنم که ثبات و اعتمادبه نفس می آورند.",
      zh: "我建立带来稳定与自信的日常节奏。"
    },
    "I teach by example: respect, honesty, and discipline.": {
      fr: "J'enseigne par l'exemple : respect, honnetete et discipline.",
      es: "Enseno con el ejemplo: respeto, honestidad y disciplina.",
      ar: "اعلم بالقدوة: الاحترام والصدق والانضباط.",
      fa: "با الگو بودن آموزش می دهم: احترام، صداقت و انضباط.",
      zh: "我以身作则：尊重、诚实与自律。"
    },
    "I protect family time and stay fully present.": {
      fr: "Je protege le temps en famille et je reste pleinement present.",
      es: "Protejo el tiempo en familia y me mantengo totalmente presente.",
      ar: "احمي وقت العائلة وابقى حاضرا بالكامل.",
      fa: "از زمان خانواده محافظت می کنم و کاملا حاضر می مانم.",
      zh: "我守护家庭时间，并保持全情投入。"
    },
    "I celebrate effort, not just outcomes.": {
      fr: "Je celebre l'effort, pas seulement les resultats.",
      es: "Celebro el esfuerzo, no solo los resultados.",
      ar: "احتفل بالجهد وليس فقط بالنتائج.",
      fa: "تلاش را جشن می گیرم، نه فقط نتیجه را.",
      zh: "我肯定努力，而不只看结果。"
    },
    "Love first": {
      fr: "L'amour d'abord",
      es: "Amor primero",
      ar: "الحب اولا",
      fa: "عشق در اولویت",
      zh: "爱为先"
    },
    "Patience always": {
      fr: "Patience toujours",
      es: "Paciencia siempre",
      ar: "الصبر دائما",
      fa: "همیشه صبر",
      zh: "始终耐心"
    },
    "Consistency daily": {
      fr: "Constance quotidienne",
      es: "Constancia diaria",
      ar: "الاستمرارية يوميا",
      fa: "پیوستگی روزانه",
      zh: "每日坚持"
    },
    "Gratitude out loud": {
      fr: "Gratitude exprimee",
      es: "Gratitud expresada",
      ar: "الامتنان بصوت مسموع",
      fa: "قدردانی آشکار",
      zh: "大声表达感恩"
    },
    "Growth together": {
      fr: "Grandir ensemble",
      es: "Crecer juntos",
      ar: "النمو معا",
      fa: "رشد باهم",
      zh: "共同成长"
    }
  };

  function normalizeText(text) {
    return text.replace(/\s+/g, " ").trim();
  }

  function setLanguageCookie(value) {
    document.cookie = `${STORAGE_KEY}=${encodeURIComponent(value)}; Max-Age=${COOKIE_MAX_AGE}; Path=/; SameSite=Lax`;
  }

  function getLanguageCookie() {
    const cookie = document.cookie
      .split(";")
      .map(function (part) {
        return part.trim();
      })
      .find(function (part) {
        return part.startsWith(`${STORAGE_KEY}=`);
      });

    if (!cookie) {
      return null;
    }

    return decodeURIComponent(cookie.slice(STORAGE_KEY.length + 1));
  }

  function saveLanguage(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (error) {
      // Ignore storage access failures; cookie will still persist language.
    }
    setLanguageCookie(value);
  }

  function readSavedLanguage() {
    try {
      const localValue = localStorage.getItem(STORAGE_KEY);
      if (localValue) {
        return localValue;
      }
    } catch (error) {
      // Ignore storage access failures and fall back to cookie.
    }
    return getLanguageCookie();
  }

  function preserveWhitespace(source, replacement) {
    const leading = source.match(/^\s*/);
    const trailing = source.match(/\s*$/);
    return `${leading ? leading[0] : ""}${replacement}${trailing ? trailing[0] : ""}`;
  }

  function translateText(source, lang) {
    if (lang === "en") {
      return source;
    }
    const key = normalizeText(source);
    const entry = TRANSLATIONS[key];
    if (!entry) {
      return source;
    }
    const replacement = entry[lang];
    if (!replacement) {
      return source;
    }
    return preserveWhitespace(source, replacement);
  }

  function gatherTextNodes(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue || !node.nodeValue.trim()) {
          return NodeFilter.FILTER_REJECT;
        }
        const parent = node.parentElement;
        if (!parent) {
          return NodeFilter.FILTER_REJECT;
        }
        const tag = parent.tagName;
        if (tag === "SCRIPT" || tag === "STYLE" || tag === "CODE" || tag === "PRE") {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    });

    const nodes = [];
    let current;
    while ((current = walker.nextNode())) {
      nodes.push({
        node: current,
        original: current.nodeValue,
      });
    }
    return nodes;
  }

  function createLanguageControl() {
    const topbarInner = document.querySelector(".topbar-inner");
    if (!topbarInner) {
      return null;
    }

    const wrapper = document.createElement("div");
    wrapper.className = "lang-control";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "lang-gear";
    button.setAttribute("aria-label", "Change language");
    button.textContent = "⚙";

    const select = document.createElement("select");
    select.className = "lang-select";
    select.setAttribute("aria-label", "Select language");

    SUPPORTED_LANGS.forEach((code) => {
      const option = document.createElement("option");
      option.value = code;
      option.textContent = `${code.toUpperCase()} - ${LANGUAGE_LABELS[code]}`;
      select.appendChild(option);
    });

    button.addEventListener("click", function () {
      wrapper.classList.toggle("open");
      if (wrapper.classList.contains("open")) {
        select.focus();
      }
    });

    document.addEventListener("click", function (event) {
      if (!wrapper.contains(event.target)) {
        wrapper.classList.remove("open");
      }
    });

    wrapper.appendChild(button);
    wrapper.appendChild(select);

    const topActions = topbarInner.querySelector(".top-actions");
    if (topActions) {
      topbarInner.insertBefore(wrapper, topActions);
    } else {
      topbarInner.appendChild(wrapper);
    }

    return { wrapper, select, button };
  }

  function init() {
    const textNodes = gatherTextNodes(document.body);
    const originalTitle = document.title;

    const metaTargets = Array.from(document.querySelectorAll("meta[name='description'],meta[property='og:description'],meta[name='twitter:description']")).map(function (meta) {
      return {
        meta,
        original: meta.getAttribute("content") || "",
      };
    });

    const control = createLanguageControl();
    if (!control) {
      return;
    }

    function applyLanguage(lang) {
      const active = SUPPORTED_LANGS.includes(lang) ? lang : "en";
      const dir = RTL_LANGS.has(active) ? "rtl" : "ltr";
      document.documentElement.lang = active;
      document.documentElement.dir = dir;

      textNodes.forEach(function (entry) {
        entry.node.nodeValue = translateText(entry.original, active);
      });

      document.title = translateText(originalTitle, active);
      metaTargets.forEach(function (item) {
        item.meta.setAttribute("content", translateText(item.original, active));
      });

      control.select.value = active;
      saveLanguage(active);
    }

    control.select.addEventListener("change", function (event) {
      applyLanguage(event.target.value);
      control.wrapper.classList.remove("open");
    });

    const initialLanguage = readSavedLanguage() || "en";
    applyLanguage(initialLanguage);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
