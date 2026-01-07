<script lang="ts">
	import { onMount } from 'svelte';

	let users = $state<unknown>(null);

	onMount(async () => {
		const response = await fetch('/api/users');
		users = await response.json();
	});
</script>

<div class="wrapper2">
    <div class="wrapper1">
        <div class="menu">
            <div class="menu-left">
                <div class="logo">
                    <img src="Think-different-Academy_LOGO_erb.png" alt="Logo" class="logomain">
                </div>

                <div class="nav">
                    <a href="/courses" class="nav-item">
                        <span>Kapitola 1</span>
                    </a>

                    <a href="/dashboard" class="nav-item">
                        <span>Kapitola 2</span>
                    </a>
                </div>
            </div> <a href="/login" class="login">Přihlásit se</a>
        </div> <div class="section section-quote">
            <img src="Think-different-Academy_LOGO_bily.png">
            <h1 class="voiceline">Think different</h1>
            <h4 class="voiceline">Academy</h4>
        </div>

        <div class="section section-text">
        	<p class="odstavec">
            Think different Academy je nezisková organizace zaměřená na rozvoj kritického a kreativního myšlení
            studentů i široké veřejnosti.
            Aktuálně vyvíjíme vzdělávací platformu, jejímž cílem je ukázat, že učení může probíhat bez úmorného
            pročítání odborných textů a s důrazem na moderní, interaktivní přístup.
            Naším záměrem je také usnadnit a zpříjemnit práci lektorům, kteří chtějí vzdělávat online,
            a nabídnout jim nástroje, díky nimž mohou své znalosti předávat efektivněji a s větším dopadem.
            </p>
        </div>

		<div class="bullshit">
            <br><br><br><h1>Vzdělávání, které tě naučí myslet, ne jen pamatovat.</h1><br><br>
            V Think Different Academy věříme, že tradiční školství už nestačí. Svět se mění rychleji než kdy dřív a my jsme tu proto, abychom ti pomohli udržet krok. Naším posláním je rozvíjet u studentů dovednosti 21. století: kreativní řešení problémů, kritické myšlení a technologickou gramotnost. Nejsme jen škola, jsme komunita inovátorů.
            <br><br><br><br><br><br><h1>Naše pilíře</h1><br><br>
            Praxe nad teorii: Žádné biflování z učebnic. U nás pracuješ na reálných projektech, které mají smysl.<br>
            Individuální přístup: Každý má jiný talent. Naši mentoři ti pomohou najít ten tvůj a rozvinout ho na maximum.<br>
            Technologie a AI: Naučíme tě, jak používat nejmodernější nástroje k tomu, abys byl efektivnější a kreativnější.<br>
            <br><br><br><br><br><br><h1>Výzva k akci</h1><br><br>
            Změň svou budoucnost ještě dnes. Přidej se k desítkám studentů, kteří už začali svou cestu v Think Different Academy. První krok začíná tvou registrací.
            V Think Different Academy nepoužíváme učebnice z minulého století. Naše výuka probíhá formou workshopů, simulací reálných projektů a diskusí. Zaměřujeme se na to, co umělá inteligence (AI) nenahradí: empatii, kreativitu, strategické rozhodování a schopnost spolupracovat v týmu. Připravujeme tě na kariéru, která možná ještě ani neexistuje.
            <br><br><br><br><br><br><h1>Co se u nás naučíte?</h1><br><br>
            Kritické myšlení: Jak filtrovat informace v době deepfakes.<br>
            Project Management: Jak dotáhnout nápad od skici až po funkční prototyp.<br>
            Prezentační dovednosti: Jak prodat svůj projekt investorům i veřejnosti.<br>
            Technologický rozhled: Jak využít AI jako svého nejlepšího parťáka.<br>
        </div>

        <div class="footer">
            <p>Kontakt: info@example.com</p>
            <p>Adresa: Ulice 123, 100 00 Praha</p>
            <p>&copy; 2025 Moje Webová Stránka</p>
        </div>
    </div>
</div>
<style>
		* {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
        }


        body {
        background: #f4f4f4;
        color: #333;
        }

        .menu {
        height: 70px;
        position: sticky;
        top: 0;
        z-index: 1000;
        background: #111;
        color: #fff;
        padding: 0px 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        }


        .menu-left {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
        }


        .logo {
        font-size: 24px;
        font-weight: bold;
        color: #4fc3f7;
        cursor: pointer;
        transition: transform 0.3s;
        }


        .logo:hover {
        transform: scale(1.1) rotate(-2deg);
        }


        .nav {
        display: flex;
        height: 100%;
        gap: 5px;
        margin-left: auto;
        }


        .nav-item {
        height: 100%;
        display: flex;
        align-items: center;
        position: relative;
        padding: 0 22px;
        cursor: pointer;
        text-decoration: none; 
        color: #ffffff      
        
        }


        .nav-item > span {
        display: block;
    padding: 10px 5px;
    cursor: pointer;
    pointer-events: none;
        }



        .nav-item:hover > span {
        background: rgba(79,195,247,0.1);
        border-radius: 6px;
        }

        .login {
        cursor: pointer;
        padding: 8px 16px;
        border: 1px solid #4fc3f7;
        border-radius: 20px;
        transition: all 0.3s ease;
        margin-left: auto;
        text-decoration: none; 
        color: inherit;       
        display: inline-block;
        }


        .login:hover {
        background: #4fc3f7;
        color: #000;
        transform: scale(1.05);
        }


        .section {
        padding: 80px 15%;
        animation: fadeUp 1.2s ease;
        }


        .section-quote {
        background: #fff;
        text-align: center;
        font-size: 28px;
        font-weight: bold;
        }


        .section-text {
        background: #eaeaea;
        font-size: 18px;
        line-height: 1.7;
        }


        .footer {
        background: #111;
        color: #bbb;
        text-align: center;
        padding: 50px 20px;
        }


        .footer p {
        margin: 10px 0;
        }

        .logomain{
            height: 50px;
        }

        .voiceline {
            color: white;
        }

        .odstavec {
            color: white;
            text-align: center;
        }

        /* ===== ANIMACE ===== */
        @keyframes slideDown {
        from {
        opacity: 0;
        transform: translateY(-30px);
        }
        to {
        opacity: 1;
        transform: translateY(0);
        }
        }


        @keyframes fadeUp {
        from {
        opacity: 0;
        transform: translateY(40px);
        }
        to {
        opacity: 1;
        transform: translateY(0);
        }
        }
</style>
