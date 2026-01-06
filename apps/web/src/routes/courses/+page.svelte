<script lang="ts">
    // Tady load funkci nepíšeme, jen přijímáme data
    export let data;
</script>

<div class="wrapper2">
        <div class="wrapper1">
            <div class="menu">
            <div class="menu-left">
            <a class="logo" href = "/"><img src="Think-different-Academy_LOGO_erb.png" class="logomain"></a>

            <div class="nav">
            <div class="nav-item">
            <span>Kapitola 1</span>
            <div class="dropdown">
            <a href="#">Podkapitola 1</a>
            <a href="#">Podkapitola 2</a>
            <a href="#">Podkapitola 3</a>
            </div>
            </div>

            <div class="nav-item">
            <span>Kapitola 2</span>
            <div class="dropdown">
            <a href="#">Podkapitola 1</a>
            <a href="#">Podkapitola 2</a>
            <a href="#">Podkapitola 3</a>
            </div>
            </div>

            <div class="nav-item">
            <span>Kapitola 3</span>
            <div class="dropdown">
            <a href="#">Podkapitola 1</a>
            <a href="#">Podkapitola 2</a>
            <a href="#">Podkapitola 3</a>
            </div>
            </div>

            <div class="nav-item">
            <span>Kapitola 4</span>
            <div class="dropdown">
            <a href="#">Podkapitola 1</a>
            <a href="#">Podkapitola 2</a>
            <a href="#">Podkapitola 3</a>
            </div>
            </div>

            <div class="nav-item">
            <span>Kapitola 5</span>
            <div class="dropdown">
            <a href="#">Podkapitola 1</a>
            <a href="#">Podkapitola 2</a>
            <a href="#">Podkapitola 3</a>
            </div>
            </div>
            </div>
            </div>
            </div>

            <div class="section section-text">
            <div class="kurzy">KURZY</div>
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
        animation: slideDown 1s ease;
        }


        .menu-left {
        display: flex;
        align-items: center;
        gap: 40px;
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


        .dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        background: #222;
        border-radius: 6px;
        overflow: hidden;
        opacity: 0;
        transform: translateY(-10px);
        pointer-events: none;
        transition: all 0.3s ease;
        }


        .dropdown a {
        display: block;
        padding: 10px 20px;
        color: #fff;
        text-decoration: none;
        white-space: nowrap;
        transition: background 0.3s;
        }


        .dropdown a:hover {
        background: #4fc3f7;
        color: #000;
        }


        .nav-item:hover .dropdown,
        .nav-item .dropdown:hover {
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
        }



        .login {
        cursor: pointer;
        padding: 8px 16px;
        border: 1px solid #4fc3f7;
        border-radius: 20px;
        transition: all 0.3s ease;
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


        .section-text {
        display: flex;
        align-items: center;
        justify-content: center;
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

        .kurzy{
            height: 250px;
            width: 600px;
            border: 2px solid rgb(74, 74, 74);
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
