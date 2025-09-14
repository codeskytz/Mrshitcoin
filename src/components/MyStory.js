import React from 'react';

const MyStory = () => (
  <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-dark-900 dark:to-dark-950 py-16 px-4 flex flex-col items-center">
    <div className="max-w-3xl w-full bg-white dark:bg-dark-900 shadow-2xl rounded-2xl p-8 border border-gray-200 dark:border-dark-700">
      <h1 className="text-5xl font-bold mb-8 text-center text-primary">Kutoka Ukapuku mpaka Bilionare</h1>
  <div className="mx-auto mb-12 text-lg text-gray-800 dark:text-gray-200">
        <h6>Niliachwa na mpenzi wangu winnie...</h6>
        
        <h2> Maisha baada ya chuo</h2><br></br>
        <p> Niruhusu nikurudishe nyuma kidogo,
miaka mtatu iliyopita baada ya kumaliza chuo Mambo yalikuwa Magumu sana Kitaa kama jinsi ilivyo kwa Wahitimu wengi… Sikuwa na Ajira, Pesa wala Mchongo wowote wa Kuniingizia Kipato, Kama mtoto wa kiume ninayetegemewa Nyumbani….Nikaanza kupiga mishe mbali mbali ili kujiingizia kipato…ikiwemo "UWINGA" (udalali), lakini bado mambo yalikua magumu zaidi,
Nikaamua Kwenda Dar Es Salaam kutafuta Michongo mingine…
Nikafikia Goba kwa shangazi,  Na kazi yangu kubwa ikawa ni Kusafisha Mazingira ya nyumbani, Kulima na Kulisha Mbwa.</p>

        <p>Sikuwa na nuru kabisa usoni (yaani nilianzia Uzeeni kuja ujanani 😀)
Naona hadi Aibu kulisema hili ila ukweli ni kwamba:kama jinsi unavyoniona kwenye hii Picha hapa chini:</p>
        <img src="/images/mrshitcoin-baby.jpg" alt="Mrshitcoin as a baby" className="rounded-xl mb-4 w-full max-w-xs mx-auto" onError={e => { e.target.src = '/logo192.png'; }} />


        <p>Hiki ndo kipindi ambacho niliachwa na Girlfriend wangu <strong>Winnie</strong> kisa nilikosa Tshs 25,000 ya Kumnunulia Cake katika siku yake ya kuzaliwa, (mapenzi jau sana)</p>

      
        <p>Niwe mkweli tu… Nilikata tamaa kabisa ya kutusua</p>



        <h2>Meza yapinduka</h2>
        

        <img src="/images/mrshitcoin-school.jpg" alt="Mrshitcoin in school" className="rounded-xl mb-4 w-full max-w-xs mx-auto" onError={e => { e.target.src = '/logo192.png'; }} />
        <p>In school, he was a curious student, always asking questions about technology and finance. His teachers saw his potential early on.</p>
        <h2>Chapter 3: First Crypto Steps</h2>
        <img src="/images/mrshitcoin-teen.jpg" alt="Mrshitcoin as a teen" className="rounded-xl mb-4 w-full max-w-xs mx-auto" onError={e => { e.target.src = '/logo192.png'; }} />
        <p>As a teenager, Mrshitcoin discovered Bitcoin and the world of meme coins. He started trading, learning from every win and loss.</p>
        <h2>Chapter 4: Breakthrough</h2>
        <img src="/images/mrshitcoin-breakthrough.jpg" alt="Breakthrough moment" className="rounded-xl mb-4 w-full max-w-xs mx-auto" onError={e => { e.target.src = '/logo192.png'; }} />
        <p>In 2020, he made his first million with a legendary meme coin trade. The world started to notice his success.</p>
        <h2>Chapter 5: Now Rich</h2>
        <img src="/images/mrshitcoin-rich.jpg" alt="Mrshitcoin now rich" className="rounded-xl mb-4 w-full max-w-xs mx-auto" onError={e => { e.target.src = '/logo192.png'; }} />
        <p>Today, Mrshitcoin lives the dream, helping others succeed in crypto and sharing his story to inspire the next generation.</p>
      </div>
      <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
        <p>Want to know more? Reach out and start your own journey!</p>
      </div>
    </div>
  </div>
);

export default MyStory;
