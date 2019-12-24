/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/*
  Constants for
  * Bugzilla new bug URL prefix
  * Bugzilla show bug URL prefix
  * Bugzilla RESTful API for query product IDs
  * Bugzilla RESTful API for query product components
  * Common bugs JSON (TO BE REMOVED)
  * WebCompat github issue URL prefix for fetch issue detail
  * WebCompat issues URL prefix, for detect enable/disable issue
*/
var bugzilla_newbug_prefix = 'https://bugzilla.mozilla.org/enter_bug.cgi?';
var bugzilla_existing_prefix = 'https://bugzilla.mozilla.org/show_bug.cgi?id=';
var bugzilla_rest_product_ids = 'https://bugzilla.mozilla.org/rest/product_enterable';
var bugzilla_rest_product_components = 'https://bugzilla.mozilla.org/rest/product?';
var common_bugs_json = 'https://mdtsai.github.io/commonbugs.json';
var github_issue_prefix = 'https://api.github.com/repos/webcompat/web-bugs/issues/';
var webcompat_prefixes = ['https://webcompat.com/issues/', 'https://www.webcompat.com/issues/'];

// Bugzilla product/component mapping JSON
var products = {"Air Mozilla":["BigBlueButton","Community","Content","Crestron","DAM","Events","Extron","Hardware","History","iCal","Krad Radio","Mobile","Other","Rendering","Schedule","Streaming","Venues","Vidyo"],
 "Android Background Services":["Android Sync","Build & Test","Core","Crypto","Firefox Accounts","Firefox Health Report Service","Geolocation","Product Announcements","Reading List Sync"],
 "Bugzilla":["Administration","Attachments & Requests","Bug Import/Export & Moving","Bugzilla-General","bugzilla.org","Creating/Changing Bugs","Database","Dependency Views","Documentation","Email Notifications","Extension Ideas","Extensions","Incoming Email","Installation & Upgrading","QA Test Scripts","Query/Bug List","Reporting/Charting","Testing Suite","User Accounts","User Interface","WebService","Whining"],
 "Calendar":["Alarms","Build Config","Calendar Views","Dialogs","E-mail based Scheduling (iTIP/iMIP)","General","ICAL.js Integration","Import and Export","Internal Components","Lightning Only","Lightning: SeaMonkey Integration","OS Integration","Preferences","Printing","Provider: CalDAV","Provider: GData","Provider: ICS/WebDAV","Provider: Local Storage","Provider: WCAP","Security","Sunbird Only","Tasks","Website"],
 "Chat Core":["Debug","Eventloop","General","IRC","Matrix","Netsoul","Skype","Twitter","XMPP","Yahoo! Messenger"],
 "Cloud Services":["cloudSync","Firefox Home","Firefox Sync: Backend","Firefox Sync: Build","Firefox Sync: Cross-client","Firefox Sync: Crypto","Firefox Sync: Other Clients","Firefox Sync: UI","Firefox: Common","FXTest-infra","General","Location","Manatee","Metrics and Firefox Health Report","Metrics: Dashboard","Metrics: Data Tools","Metrics: Pipeline","Metrics: Product Metrics","Mission Control","MobileID","Operations","Operations: AMO","Operations: Antenna","Operations: Autopush","Operations: AWS Account Request","Operations: Deployment Requests","Operations: Marketplace","Operations: Metrics/Monitoring","Operations: Normandy","Operations: Pageshot","Operations: Product Delivery","Operations: Shavar","Operations: Storage","Payments","QA: General","QA: Test Automation","Security","Server: absearch","Server: Account Portal","Server: Core","Server: Firefox Accounts","Server: Identity","Server: Key Exchange","Server: Kinto","Server: Other","Server: Product Announcements Campaign Manager","Server: Product Announcements Redirector","Server: ReadingList","Server: Registration","Server: Screenshots","Server: Share","Server: Shavar","Server: Sync","Server: Token","Share: Firefox Client","Share: Web Client","SimplePush","Web Site","WebPush"],
 "Community Building":["Community Equipment/Hardware","Community Fundraising and Partnerships","Contribute","cs / Czech","de / German","Education and Culture","Events","General","MozFestEA","Partnerships","Pathways","Recognition","Research","sk / Slovak","Systems and Data","ug / Uganda"],
 "Composer":["Accessibility","Build Config","Colorpicker","CSS Editor","CSS Styles","Documentation","Extensions and Themes","General","Installer","OS Integration","Preferences","Sidebars","Site Manager","Software Update","Source View","Startup","Tabbed Editor","Tabs","Templates","Tip of the Day","Toolbars"],
 "Conduit":["Administration","Documentation","General","Infrastructure","Lando API","Lando UI","Phabricator (Upstream)","Phabricator Extensions"],
 "Connected Devices":["Metrics","Other","Participation","Project Cue","Project Deep Speech","Project Link","Project Magnet","Project Sensor Web","Project Smart Home","Project SmartKitchen","Project Vaani","Research"],
 "Core":["Audio/Video","Audio/Video: cubeb","Audio/Video: GMP","Audio/Video: MediaStreamGraph","Audio/Video: Playback","Audio/Video: Recording","AutoConfig (Mission Control Desktop)","Build Config","Canvas: 2D","Canvas: WebGL","CSS Parsing and Computation","Disability Access APIs","DMD","Document Navigation","DOM","DOM: Animation","DOM: Apps","DOM: Contacts","DOM: Content Processes","DOM: Core & HTML","DOM: CSS Object Model","DOM: Device Interfaces","DOM: Events","DOM: File","DOM: Flyweb","DOM: IndexedDB","DOM: Push Notifications","DOM: Quota Manager","DOM: Security","DOM: Service Workers","DOM: Web Payments","DOM: Workers","Drag and Drop","Editor","Embedding: APIs","Event Handling","Find Backend","FxAccounts","Gecko Profiler","General","Geolocation","GFX: Color Management","Graphics","Graphics: Layers","Graphics: Text","Graphics: WebRender","Hardware Abstraction Layer (HAL)","History: Global","HTML: Form Submission","HTML: Parser","Identity","Image Blocking","ImageLib","Internationalization","IPC","JavaScript Engine","JavaScript Engine: JIT","JavaScript: GC","JavaScript: Internationalization API","JavaScript: Standard Library","js-ctypes","Keyboard: Navigation","Layout","Layout: Block and Inline","Layout: Floats","Layout: Form Controls","Layout: HTML Frames","Layout: Images","Layout: Misc Code","Layout: R & A Pos","Layout: Tables","Layout: Text","Layout: View Rendering","Layout: Web Painting","Localization","mach","MathML","Memory Allocator","MFBT","mozglue","Nanojit","Networking","Networking: Cache","Networking: Cookies","Networking: DNS","Networking: Domain Lists","Networking: File","Networking: FTP","Networking: HTTP","Networking: JAR","Networking: WebSockets","Panning and Zooming","Permission Manager","Platform Fuzzing Team","Plug-ins","Preferences: Backend","Print Preview","Printing: Output","Printing: Setup","QuickLaunch (AKA turbo mode)","RDF","Rewriting and Analysis","Security","Security: CAPS","Security: Process Sandboxing","Security: PSM","Selection","Serializers","Spelling checker","String","SVG","Untriaged","Web Audio","Web Services","Web Speech","WebRTC","WebRTC: Audio/Video","WebRTC: Networking","WebRTC: Signaling","WebVR","Widget","Widget: Android","Widget: Cocoa","Widget: Gonk","Widget: Gtk","Widget: Win32","Widget: WinRT","Window Management","X-remote","XBL","XML","XP Toolkit/Widgets: Menus","XP Toolkit/Widgets: XUL","XPCOM","XPConnect","XSLT","XUL"],
 "Data & BI Services Team":["BI: Existing Dashboards","BI: New Dashboards","BI: Tableau Administration","Data Processing : ETL : Vertica target","Data Warehouse","DB: Hadoop Administration","DB: MySQL","DB: MySQL bugzilla/reviewboard","DB: Postgres","DI: Bagheera/Kafka","DI: Hadoop","DI: New request","DI: Other","DI: Problem/support","Other"],
 "Data Compliance":["General"],
 "Data Platform and Tools":["Datasets: Addons","Datasets: Client Count","Datasets: Crash Aggregates","Datasets: Cross-Sectional","Datasets: Events","Datasets: Experiments","Datasets: General","Datasets: Longitudinal","Datasets: Main Summary","Datasets: Mobile","Datasets: Search","Datasets: Telemetry Aggregates","Distribution Viewer","Documentation and Knowledge Repo (RTMO)","General","HBase","Monitoring & Alerting","Operations","Pipeline Ingestion","Presto","Redash (STMO)","Scheduling","Spark","Telemetry Aggregation Service","Telemetry Analysis Service (ATMO)","Telemetry APIs for Analysis"],
 "Datazilla":["Client","Database","General","Metrics","User interface","Web service"],
 "Developer Documentation":["Accessibility","Add-ons","API: CSSOM","API: Device API","API: DOM","API: File API","API: HTML","API: IndexedDB","API: Miscellaneous","API: SVG","API: Web Animations","API: Web Audio","API: Web Sockets","API: Web Workers","API: WebRTC","Apps","CSS","Developer Tools","Emscripten","Firefox OS","Games","General","HTML","JavaScript","Learning Area","Localization","Macros/Templates","Marketplace","MathML","MDN Meta Docs","Mozilla Platform","Protocols","Security","SVG"],
 "Developer Ecosystem":["App Center","Apps","Dev Kit","Web Components"],
 "Developer Engagement":["Demo Request","Events Request","Events Request Discussion","Material Review Request","Mozilla Hacks","Outreach Request"],
 "Developer Services":["General","Git","Legacy VCS","Mercurial: bundleclone","Mercurial: bzexport","Mercurial: bzpost","Mercurial: configwizard","Mercurial: firefoxtree","Mercurial: hg.mozilla.org","Mercurial: mozext","Mercurial: Pushlog","Mercurial: qbackout","Mercurial: qimportbz","Mercurial: robustcheckout","Servo VCS Sync"],
 "Directory":["LDAP C SDK","LDAP Java SDK","LDAP Tools","LDAP XPCOM SDK","PerLDAP"],
 "Enterprise Information Security":["General","Incident","Investigation","MIG","MozDef","NSM","Penetration Test","Rapid Risk Analysis","Risk Record","Threat Modeling","Vulnerability Assessment"],
 "Finance":["Accounting/Audit","Bank Document","Contractor Contract","Offer Letter","Purchase Request Form","Vendor Amendment","Vendor SOW"],
 "Firefox":["Activity Streams: Application Servers","Activity Streams: General","Activity Streams: Newtab","Activity Streams: Server Operations","Activity Streams: Timeline","Address Bar","Bookmarks & History","Build Config","Developer Tools","Developer Tools: about:debugging","Developer Tools: Animation Inspector","Developer Tools: Canvas Debugger","Developer Tools: Computed Styles Inspector","Developer Tools: Console","Developer Tools: CSS Rules Inspector","Developer Tools: Debugger","Developer Tools: DOM","Developer Tools: Font Inspector","Developer Tools: Framework","Developer Tools: Graphic Commandline and Toolbar","Developer Tools: Inspector","Developer Tools: JSON Viewer","Developer Tools: Measuring Tool","Developer Tools: Memory","Developer Tools: Netmonitor","Developer Tools: Object Inspector","Developer Tools: Performance Tools (Profiler/Timeline)","Developer Tools: Responsive Design Mode","Developer Tools: Scratchpad","Developer Tools: Shared Components","Developer Tools: Source Editor","Developer Tools: Storage Inspector","Developer Tools: Style Editor","Developer Tools: Web Audio Editor","Developer Tools: WebGL Shader Editor","Developer Tools: WebIDE","Device Permissions","Disability Access","Distributions","Downloads Panel","Extension Compatibility","File Handling","Foxfooding","General","Headless","Installer","Keyboard Navigation","Menus","Migration","New Tab Page","Page Info Window","PDF Viewer","Pocket","Preferences","Private Browsing","RSS Discovery and Preview","Screen Sharing Whitelist","Screenshots","Search","Security","Security: Review Requests","Session Restore","Shell Integration","Site Identity and Permission Panels","SocialAPI","SocialAPI: Providers","Sync","Tabbed Browser","Theme","Toolbars and Customization","Tours","Tracking Protection","Translation","Untriaged"],
 "Firefox Friends":["friends.mozilla.org","Mobile","Other","Planning"],
 "Firefox Health Report":["Client: Android","Client: Desktop","Web: Health Report"],
 "Firefox for Android":["Activity Stream","Add-on Manager","Audio/Video","Awesomescreen","Build Config & IDE Support","Custom Tabs","Data Providers","Distributions","Download Manager","Family Friendly Browsing","Favicon Handling","Firefox Accounts","First Run","GeckoView","General","Graphics, Panning and Zooming","JimDB","Keyboards and IME","Locale switching and selection","Logins, Passwords and Form Fill","Metrics","Overlays","Plugins","Profile Handling","Reader View","Reading List","Screencasting","Search Activity","Session Restore","Settings and Preferences","Testing","Text Selection","Theme and Visual Design","Web Apps"],
 "Firefox for iOS":["Browser","Build & Test","Data Storage","Favicons","Firefox Accounts","General","Home screen","Localization","Login Management","Menu and Toolbar","Reader View","Reading List","Sync","Telemetry","Theme & Visual Design"],
 "Hello (Loop)":["Client","General","Server"],
 "Infrastructure & Operations":["AVOps: Conference Rooms","AVOps: Corsica","AVOps: Crestron","AVOps: Projects","AVOps: Streaming","AVOps: Vidyo","Change Requests","Community IT","Community IT: Discourse","Community IT: Hosting","Community IT: Infrastructure","Community IT: Others","Community IT: Wordpress","DCOps","Etherpad Migration","Infrastructure: AWS","Infrastructure: Backups","Infrastructure: DNS","Infrastructure: IRC","Infrastructure: LDAP","Infrastructure: Mail","Infrastructure: OpenVPN","Infrastructure: Other","Infrastructure: Puppet","Infrastructure: SSO","Infrastructure: Tools","Marketing Infrastructure","MOC: Documentation","MOC: Problems","MOC: Projects","MOC: Root Cause Analysis","MOC: Service Requests","Mozilla VPN: ACL requests","Mozilla VPN: Support requests","Multi-Factor Authentication","NetOps","NetOps: DC ACL Request","NetOps: DC Carrier","NetOps: DC Other","NetOps: DC Port Configurations","NetOps: Office ACL Requests","NetOps: Office Carrier","NetOps: Office Other","NetOps: Office Wireless","NetOps: Other","NetOps: Projects","Proxy ACL Request","RelOps","RelOps: Puppet","Servicedesk","Storage","Telecom","Tools","Virtualization","WebOps: Blogs","WebOps: Community Platform","WebOps: IT-Managed Tools","WebOps: Other","WebOps: SSL and Domain Names"],
 "Input":["General"],
 "Instantbird":["Account manager","Account wizard","Contacts window","Conversation","Demo Add-ons","Localization","Other","Preferences"],
 "Instantbird Servers":["addons.instantbird.org","blog.instantbird.com","buildbot.instantbird.org","crash-stats.instantbird.com","hg.instantbird.org","Other","update.instantbird.org","wiki.instantbird.org","www.instantbird.com"],
 "Intellego":["General"],
 "Internet Public Policy":["Copyright and Patent","Cyber-Security","General","Internet Governance","Net Neutrality","Privacy and Data"],
 "Invalid Bugs":["General"],
 "JSS":["Documentation","Library","Sample Code","Tests"],
 "L20n":["Evangelism","Gaia Bindings","General","HTML Bindings","JS Library","L20n.org","Python Library"],
 "Localization Infrastructure and Tools":["Administration / Setup","Aisle","Automation","compare-locales","General","Quality","Silme"],
 "MailNews Core":["Account Manager","Address Book","Attachments","Backend","Build Config","Composition","Database","Feed Reader","Filters","Import","Internationalization","LDAP Integration","Localization","MIME","Movemail","Networking","Networking: IMAP","Networking: NNTP","Networking: POP","Networking: SMTP","Printing","Profile Migration","Search","Security","Security: S/MIME","Simple MAPI","Testing Infrastructure"],
 "Marketing":["Business Development","Community","Copy","Design","Email","Event Requests","General","IPC","Social Media","Swag Requests","Trademark Permissions","Trademark Violations","User Engagement","Video"],
 "Marketplace":["3rd Party Applications","Admin Tools","API","Code Quality","Consumer Pages","Curation Tools","Developer Pages","General","Integration","Payments/Refunds","Reference Apps","Request to Pre-Install Apps","Reviewer Tools","Search","Security","Statistics","Validation"],
 "MozReview":["Autoland","Bots","Documentation","General","Infrastructure","Integration: Bugzilla","Integration: Git","Integration: Mercurial","Review Board: DiffViewer","Review Board: Extension","Review Board: Upstream","Review Board: User Interface","reviewbot","Testing / Development Environment"],
 "Mozilla Developer Network":["Account Help","Administration","API","BrowserCompat","Code Cleanup","Collaboration","Dashboards","Demo Studio / Dev Derby","Demos","Design","Docs Platform","Editing","Events","File attachments","General","KumaScript","Localization","Marketing","Performance","Profiles","Search","Security","Setup / Install","Sign-in","Tags / flags","User management","Website","Wiki pages"],
 "Mozilla Foundation":["Metrics"],
 "Mozilla Foundation Communications":["Blog","Copy Editing and Review","CRM","Documentation","Email Outreach","Graphic Design","Internal Process","Launch","Logo Design and Identity","Message Platform","Press","Press Clips","Social Media","Staff Email","Website"],
 "Mozilla Foundation Operations":["General"],
 "Mozilla Grants":["Administration/Accounting","Applications","Award Management","Develop Budget","Develop Proposal","Final Review","Launch Proposal","Reports/Deliverables"],
 "Mozilla Labs":["Chocolate Factory","Concept Series","Contacts","Design","Doctor JS","F1","Gaming","General","Identity","Jetpack Prototype","Jetpack SDK","Joey","JS Modules","Labs Pack","New Tab","OpenWebApps","Operator","Prism","Raindrop","Research","Snowl","Ubiquity"],
 "Mozilla Localizations":["ach / Acholi","af / Afrikaans","ak / Akan","an / Aragonese","ar / Arabic","as / Assamese","ast / Asturian","az / Azerbaijani","be / Belarusian","bg / Bulgarian","bm / Bambara","bn-BD / Bengali","bn-IN / Bengali (India)","br / Breton","brx / Bodo","bs / Bosnian","ca / Catalan","cak / Kaqchikel","cs / Czech","csb / Kashubian","cy / Welsh","da / Danish","de / German","Documentation","dsb / Lower Sorbian","ee / Ewe","el / Greek","en-GB / English (United Kingdom)","en-ZA / English (South Africa)","eo / Esperanto","es / International Spanish","es-AR / Spanish (Argentina)","es-CL / Spanish (Chile)","es-ES / Spanish","es-MX / Spanish (Mexico)","et / Estonian","eu / Basque","fa / Persian","ff / Fulah","fi / Finnish","fr / French","fy-NL / Frisian","ga-IE / Irish","gd / Scottish Gaelic","gl / Galician","gn / Guarani","gu-IN / Gujarati","ha / Hausa","haw / Hawaiian","he / Hebrew","hi-IN / hindi","hr / Croatian","hsb / Upper Sorbian","hu / Hungarian","hy-AM / Armenian","ia / Interlingua","id / Indonesian","ig / Igbo","ilo / Iloko","Infrastructure","is / Icelandic","it / Italian","ja / Japanese","ka / Georgian","kab / Kabyle","kk / Kazakh","km / Khmer","kn / Kannada","ko / Korean","kok / Konkani","ks / Kashmiri","ku / Kurdish","lg / Luganda","lij / Ligurian","ln / Lingala","lo / Lao","lt / Lithuanian","ltg / Latgalian","lv / Latvian","mai / Maithili","mg / Malagasy","mk / Macedonian","ml / Malayalam","mn / Mongolian","mr / Marathi","ms / Malay","my / Burmese","nb-NO / Norwegian Bokmål","ne-NP / Nepali (Nepal)","nl / Dutch","nn-NO / Norwegian Nynorsk","nr / Southern Ndebele","nso / Northern Sotho (Pedi)","oc / Occitan","or / Odia","Other","pa-IN / Punjabi","pl / Polish","pt-BR / Portuguese (Brazil)","pt-PT / Portuguese","Registration & Management","rm / Romansh","ro / Romanian","ru / Russian","rw / Kinyarwanda","sah / Sakha","sat / Santali","si / Sinhala","sk / Slovak","sl / Slovene","son / Songhay","sq / Albanian","sr / Serbian","ss / Swazi","st / Southern Sotho","sv-SE / Swedish","sw / Swahili","ta / Tamil","ta-LK / Tamil (Sri Lanka)","te / Telugu","th / Thai","tl / Tagalog","tn / Tswana","tr / Turkish","trs / Triqui","ts / Tsonga","tsz / Purépecha","uk / Ukrainian","ur / Urdu","uz / Uzbek","ve / Venda","vi / Vietnamese","wo / Wolof","xh / Xhosa","yo / Yoruba","zam / Miahuatlán Zapotec","zh-CN / Chinese (Simplified)","zh-TW / Chinese (Traditional)","zu / Zulu"],
 "Mozilla Metrics":["Data/Backend Reports","downloadstats.mozilla.com","Frontend Reports","Hadoop/HBase Operations","Metrics Data Ping","Metrics Operations"],
 "Mozilla QA":["Case Conductor-Platform","General","Infrastructure","MozIlluminate","Mozmill Tests","MozTrap","One and Done"],
 "Mozilla Reps":["Add-on","Budget Requests","Community IT Requests","Mentorship","Planning","reps.mozilla.org","Swag Requests"],
 "NSPR":["NSPR"],
 "NSS":["Build","CA Certificate Mis-Issuance","CA Certificate Root Program","CA Certificates Code","Documentation","Libraries","Test","Tools"],
 "Other Applications":["CCK","ChatZilla","DOM Inspector","Fizzypop","McCoy","mozStorage Explorer","Narcissus","PyXPCOM","QA Companion","Reporter","Venkman JS Debugger","XUL Explorer"],
 "Pancake":["Add-On","Back-end","Dashboard","Front-end","General","Native Android Wrapper","Native iOS Wrapper","Sync","Thumbnailer"],
 "Participation Infrastructure":["Account Help","API Requests","Community Ops","Data Complaints","Events Manager","Phonebook","Security","TaskBoard"],
 "Petri":["General"],
 "Plugin Check":["Client","Database","General","UI","Whistler"],
 "Powertool":["Hardware","Software"],
 "Recruiting":["General","Intern"],
 "Release Engineering":["Balrog: Backend","Balrog: Frontend","Buildduty","General","General Automation","Loan Requests","Mozharness","Platform Support","Release Automation","Releases","Releases: Custom Builds","Ship It","Tools","TreeStatus"],
 "Rhino":["Compiler","Core","E4X"],
 "SeaMonkey":["Autocomplete","Bookmarks & History","Build Config","Composer","Download & File Handling","Feed Discovery and Preview","Find In Page","General","Help Documentation","Help Viewer","Installer","Location Bar","MailNews: Account Configuration","MailNews: Address Book & Contacts","MailNews: Backend","MailNews: Composition","MailNews: General","MailNews: Message Display","OS Integration","Page Info","Passwords & Permissions","Preferences","Project Organization","Release Engineering","Search","Security","Session Restore","Sidebar","Startup & Profiles","Sync UI","Tabbed Browser","Testing Infrastructure","Themes","UI Design"],
 "Shield":["Actions","Add-on","General","Heartbeat","Recommendation","Repair","Service","Shield Study"],
 "Snippets":["Campaign","General","HTML5","Service","Surveys"],
 "Socorro":["Antenna","Backend","Data request","Database","General","Infra","Processor","Symbols","Webapp"],
 "Taskcluster":["Authentication","AWS-Provisioner","Client Libraries","Discussion","Docker Images","Docker-Worker","Documentation","General","Generic-Worker","Github","Hooks","Index","Integration","Login","Operations","Platform and Services","Platform Libraries","Queue","Scheduler","Secrets","Service Request","Task Configuration","Tools","Worker"],
 "Tech Evangelism":["Add-ons","Desktop","Mobile","Preinstalled B2G Apps"],
 "Testing":["ActiveData","Autophone","AWFY","AWSY","BrowserTest","Code Coverage","external-media-tests","Fennec Profile Tool","Firefox UI Tests","geckodriver","General","httpd.js","JSMarionette","Lint","Marionette","Minotaur","Mochitest","Mochitest Chrome","Mozbase","mozregression","mozscreenshots","New Frameworks","Orangutan","Peptest","ProfileManager","Reftest","Sisyphus","ssltunnel","SUTAgent","Talos","Test Informant","TPS","web-platform-tests","WebQA","XPCShell Harness"],
 "Testopia":["API","Cloning","Environments","Fields","General","Import/Export","Integrations","Reports","Search","Security","Tags","Test Cases","Test Plans","Test Runs","User Interface"],
 "Thunderbird":["Account Manager","Address Book","Build Config","Disability Access","FileLink","Filters","Folder and Message Lists","General","Help Documentation","Installer","Instant Messaging","Mail Window Front End","Message Compose Window","Message Reader UI","Migration","OS Integration","Preferences","Search","Security","Testing Infrastructure","Theme","Toolbars and Tabs","Untriaged"],
 "Toolkit":["about:memory","Add-ons Manager","Application Update","Async Tooling","Autocomplete","Blocklisting","Build Config","Crash Reporting","Downloads API","Find Toolbar","Forget About Site","Form Manager","General","Microformats","Notifications and Alerts","NSIS Installer","OS.File","Password Manager","Password Manager: Site Compatibility","Performance Monitoring","Places","Preferences","Printing","Reader Mode","Safe Browsing","Spatial Navigation","Startup and Profile System","Storage","Telemetry","Themes","Toolbars and Toolbar Customization","Video/Audio Controls","View Source","WebExtensions: Android","WebExtensions: Compatibility","WebExtensions: Developer Tools","WebExtensions: Experiments","WebExtensions: Frontend","WebExtensions: General","WebExtensions: Request Handling","WebExtensions: Untriaged","WebPayments UI","XUL Widgets"],
 "Tracking":["Firefox Operations","Firefox Sync","General","Kilimanjaro","Marketplace","Metro Operations","User Story"],
 "Tree Management":["Bugherder","OrangeFactor","Perfherder","Treeherder","Treeherder: API","Treeherder: Client Libraries","Treeherder: Data Ingestion","Treeherder: Docs & Development","Treeherder: Infrastructure","Treeherder: Log Parsing & Classification","Treeherder: Log Viewer","Treeherder: SETA","Treeherder: Test-based View","Visibility Requests"],
 "Web Compatibility Tools":["General","Go Faster"],
 "Websites":["activations.mozilla.org","Adaptive Search","air.mozilla.com","Basket","bespinplugins.mozillalabs.com","blog.mozilla.com/theden","blog.mozilla.org","browserchoice.mozilla.com","careers.mozilla.org","communitystore.mozilla.org","creative.mozilla.org","demos.mozilla.org","detodosparatodos.org","donate.mozilla.org","downloadstats.mozilla.com","extendfirefox.com/mobile-cup/","Facebook","feeds.mozilla.com","Firefox Flicks","Firefox Start","firefoxgarden.org","gear.mozilla.org","getfirebug.com","glow.mozilla.org","inform.mozilla.org","intlstore.mozilla.org","learningfreedomandtheweb.org","login.mozilla.com","markup.mozilla.org","Morgoth","Mozilla Community Sites","mozilla.de","mozilla.org.uk","mozilla.status.net","mozillalabs.com","Nucleus","openbadges.org","Other","other.mozilla.org","planet.firefox.com/mobile","planet.mozilla.org","plugins.mozilla.org","Scrumbugs","Shape of the Web","spark.mozilla.org","store.mozilla.org","studentreps.mozilla.org","Tabzilla","The Open Standard","tools.mozilla.com","Web Analytics","webifyme.org","website-archive.mozilla.org","wiki.mozilla.org","workshop.mozilla.org","www.mozilla-japan.org","www.mozilla.jp","www.mozillaonline.com","www.seamonkey-project.org","Your Web"],
 "Webtools":["Air Mozilla","Bleach-security","Bouncer","BzAPI","DXR","Elmo","General","ISPDB Database Entries","ISPDB Server","kanbanzilla","mediawiki-bugzilla","Mozbot","Mozilla Community Sites","MXR","Peekaboo","Phonebook","Pontoon","Prior Art","PTO","Pulse","Searchfox","Telemetry Dashboard","Telemetry Server"],
 "addons.mozilla.org":["Security"],
 "bugzilla.mozilla.org":["Administration","API","Bug Creation/Editing","Bugzilla Anthropology Metrics","Bugzilla Change Notification System","Bugzilla Tweaks","Bulk Bug Edit Requests","Custom Bug Entry Forms","Developer Box","Documentation","Editbugs Requests","Email Notifications","Extensions: AntiSpam","Extensions: BMO","Extensions: BugmailFilter","Extensions: BzAPI Compatibility","Extensions: ComponentWatching","Extensions: EditComments","Extensions: FlagTypeComment","Extensions: GitHubAuth","Extensions: GuidedBugEntry","Extensions: InlineHistory","Extensions: MozProjectReview","Extensions: MozReview Integration","Extensions: MyDashboard","Extensions: Needinfo","Extensions: OrangeFactor","Extensions: Other","Extensions: Persona","Extensions: PhabBugz","Extensions: ProdCompSearch","Extensions: ProductDashboard","Extensions: Push","Extensions: REMO","Extensions: RequestNagger","Extensions: RestrictComments","Extensions: Review","Extensions: SecureMail","Extensions: Selectica","Extensions: Splinter","Extensions: TrackingFlags","Extensions: TryAutoLand","Extensions: UserProfile","General","Graveyard Tasks","Infrastructure","Readable Bug Statuses","Sandstone/Mozilla Skin","Search","Testing Scripts and Infrastructure","User Interface","User Interface: Modal"],
 "mozilla.org":["Community Giving","CVS: Administration","CVS: Copy","Discussion Forums","FTP: Mirrors","FTP: Staging","Github: Administration","Governance","Heroku: Administration","Licensing","Localization Server","Miscellaneous","Mobile Opportunity Research Initiative","MozillaBuild","Project Review","Relic","Repository Account Requests","Security Assurance","Security Assurance: Applications","Security Assurance: FxOS Review","Security Assurance: Review Request","Server Operations: Community IT","Talkback Server & Webtool","Test Tracker","Video","Webdev"],
 "mozillaignite":["General"],
 "quality.mozilla.org":["Content","Website"],
 "support.mozilla.org":["App","Army of Awesome","BuddyUp","Code Quality","Forum","General","Knowledge Base Articles","Knowledge Base Content","Knowledge Base Software","Lithium Migration","Localization","Mobile","Questions","Search","Users and Groups"],
 "www.mozilla.org":["Analytics","Bedrock","General","Information Architecture & UX","L10N","Legacy PHP system","Newsletters","Pages & Content","Product Details","Project Tracking","Release notes","Thunderbird"]
};

// Preload common bugs
var commonbugs = {"1392147": "Clear Sans and Roboto fonts disparities break layouts",
 "1391430": "Animated GIFs render incorrectly on Android",
 "1368555": "Implement -webkit-appearance",
 "1089326": "Button with a href inside",
 "1352238": "Native theme for form controls on Firefox Android",
 "1294490": "WebP Image support",
 "1357674": "CSS color for placeholder text",
 "752790":  "Input padding covers text",
 "218415":  "window.event",
 "866102":  "-webkit-line-clamp",
 "390936":  "CSS zoom",
 "1123938": "Virtual viewport",
 "823483":  "Max-width",
 "941351":  "m3u8video",
 "617034":  "Meta viewport fixed size"
};

function loadBugzillaProducts() {
  // Restore cached products
  chrome.storage.local.get("products", function(items) {
    if (typeof items.products !== "undefined" && items.products) {
      products = items.products;
    }
  });

  console.log("Webcompat-to-Bugzilla: begin loads product/component mapping");
  // Fetch all bug enterable bug IDs from bugzilla restful API
  fetch(bugzilla_rest_product_ids).then(function(response) {
    var contentType = response.headers.get("content-type");
    if(contentType && contentType.includes("application/json")) {
      return response.json();
    }
  }).then(function(json_products) {
    // Concat all product IDs and query the product/component JSON
    // Note: It's large and slow
    var product_components_url = bugzilla_rest_product_components;
    for (var productId of json_products.ids) {
      product_components_url += "ids=" + productId + "&";
    }
    fetch(product_components_url).then(function(response) {
      var contentType = response.headers.get("content-type");
      if(contentType && contentType.includes("application/json")) {
        return response.json();
      }
    }).then(function(mappings) {
      var new_products = {};

      for (var product of mappings.products) {
        var components = [];
        for (var component of product.components) {
          components.push(component.name);
        }
        new_products[product.name] = components;
      }
      console.log("Webcompat-to-Bugzilla: product/component mapping load done");

      if (JSON.stringify(products) !== JSON.stringify(new_products)) {
        products = new_products;
        chrome.storage.local.set({"products": new_products});
      }
    });
  });
}

function loadCommonBugs() {
  // Restore cached commonbugs
  chrome.storage.local.get("commonbugs", function(items) {
    if (typeof items.commonbugs !== "undefined" && items.commonbugs) {
      commonbugs = items.commonbugs;
    }
  });
  console.log("Webcompat-to-Bugzilla: begin loads common bugs");
  // Fetch all bug enterable bug IDs from bugzilla restful API
  fetch(common_bugs_json).then(function(response) {
    var contentType = response.headers.get("content-type");
    if(contentType && contentType.includes("application/json")) {
      return response.json();
    }
  }).then(function(json_commonbugs) {
    console.log("Webcompat-to-Bugzilla: common bugs load done");
    if (JSON.stringify(commonbugs) !== JSON.stringify(json_commonbugs)) {
      commonbugs = json_commonbugs;
      chrome.storage.local.set({"commonbugs": commonbugs});
    }
  });
}

function enableOrDisable(tabId, changeInfo, tab) {
  function isReportableURL(url) {
    return webcompat_prefixes.some(prefix => url.startsWith(prefix));
  }

  if (changeInfo.status == "loading" && isReportableURL(tab.url)) {
    chrome.browserAction.enable(tabId);
  } else if (changeInfo.status == "loading" && !isReportableURL(tab.url)) {
    chrome.browserAction.disable(tabId);
  }
}

function parseIssueToBug(issue_body, bug) {
  var lines = issue_body.split("\n");

  // Get summary from **Description**: and version from **Browser / Version**:
  for (var line of lines) {
    if (line.startsWith("**Description**:")) {
      bug.summary = line.split("**Description**:")[1];
    }
    if (line.startsWith("**Browser")) {
      bug.version = parseInt(line.replace( /^\D+/g, '')) + " Branch";
    }
  }

  bug.description = issue_body.split("**Steps to Reproduce**:")[1].split("_From [webcompat.com]")[0];
}

// Handle message from tool bar action
function handleMessage(request, sender, sendResponse) {
  if (request.type == "new") {
    var product = request.product;
    var component = request.component;

    // Get current tab and get issue number from URL
    chrome.tabs.query({currentWindow: true, active: true}, function(tab) {
      var issue_number = -1;
      webcompat_prefixes.some(prefix => issue_number = tab[0].url.split(prefix)[1]);
      var newTabUrl = `${bugzilla_newbug_prefix}format=__default__&product=${encodeURIComponent(product)}&component=${encodeURIComponent(component)}&wcissue=${encodeURIComponent(issue_number)}`;

      // Create a new tab with product/component/wcissue
      // Bugzilla will ignore wcissue, content script can use the issue number later
      chrome.tabs.create({'url': newTabUrl}, function(tab) {
        chrome.tabs.executeScript(tab.id, {
          file: "content_scripts/new_bug.js"
        });
      });
    });
  } else if (request.type == "seealso") {
    chrome.tabs.query({currentWindow: true, active: true}, function(tab) {
      var issue_number = -1;
      webcompat_prefixes.some(prefix => issue_number = tab[0].url.split(prefix)[1]);
      var newTabUrl = `${bugzilla_existing_prefix}${request.bugnumber}&wcissue=${encodeURIComponent(issue_number)}`;

      // Create a new tab with wcissue
      // Bugzilla will ignore wcissue, content script can use the issue number
      chrome.tabs.create({ 'url': newTabUrl, 'active': false }, function(newTab) {
        chrome.tabs.executeScript(newTab.id, {
          file: "content_scripts/see_also.js"
        });
      });

      var comment = `Close as duplicate of ${bugzilla_existing_prefix}${request.bugnumber}`;
      // Open label editor, Click duplidate, Close label editor
      // Leave message
      var code = `
                  document.querySelector(".js-MilestoneEditorLauncher").click();
                  document.querySelector("input[name='duplicate']").click();
                  document.querySelector(".js-MilestoneEditorLauncher").click();
                  document.querySelector("#newComment").value="${comment}";
                  document.querySelector(".js-Issue-comment-button").click();
                  `;
      chrome.tabs.executeScript(tab[0].id, {
        code: code
      });
    });
  } else if (request.type == "request") {
    // Helper function to update bugzilla product/componebt mapping and common bugs
    sendResponse({products: JSON.stringify(products), commonbugs: JSON.stringify(commonbugs)});
  }
}

// #28 Reload Bugzilla products and common bugs every hour
setInterval(loadBugzillaProducts, 60 * 60 * 1000);
setInterval(loadCommonBugs, 60 * 60 * 1000);

chrome.runtime.onMessage.addListener(handleMessage);
chrome.runtime.onInstalled.addListener(loadBugzillaProducts);
chrome.runtime.onInstalled.addListener(loadCommonBugs);
chrome.tabs.onUpdated.addListener(enableOrDisable);
