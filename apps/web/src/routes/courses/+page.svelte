<script lang="ts">
    export let data;
</script>

<div class="wrapper2">
    <div class="wrapper1">
        <div class="menu">
            <div class="menu-left">
                <a class="logo" href="/"><img src="Think-different-Academy_LOGO_erb.png" alt="Logo" class="logomain"></a>

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
                </div>
            </div>
        </div>

        <div class="section section-text">
            <div class="courses-container">
                {#if data.courses && data.courses.length > 0}
                    {#each data.courses as course}
                        <a href="/courses/{course.uuid}" class="course-card">
                            <h3>{course.name}</h3>
                            <p>{course.description || 'Bez popisu'}</p>
                            <span class="detail-btn">Zobrazit detail</span>
                        </a>
                    {/each}
                {:else}
                    <div class="no-courses">
                        <p>Aktuálně nejsou k dispozici žádné kurzy.</p>
                        </div>
                {/if}
            </div>
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
        font-family: 'Dosis', Arial, sans-serif;
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
        padding: 0 30px;
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

    .logomain {
        height: 50px;
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
    }

    .dropdown a:hover {
        background: #4fc3f7;
        color: #000;
    }

    .nav-item:hover .dropdown {
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
    }

    .section-text {
        padding: 60px 10%;
        background: #eaeaea;
        min-height: 60vh;
        display: flex;
        justify-content: center;
    }

    .courses-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 25px;
        width: 100%;
        max-width: 1200px;
    }

    .course-card {
        background: #1A1A1A;
        color: white;
        padding: 25px;
        border-radius: 15px;
        text-decoration: none;
        border-left: 8px solid #0070BB;
        transition: transform 0.3s ease, border-color 0.3s ease;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .course-card:hover {
        transform: translateY(-5px);
        border-left-color: #91F5AD;
    }

    .course-card h3 {
        margin-bottom: 10px;
        color: #91F5AD;
    }

    .detail-btn {
        margin-top: 15px;
        font-size: 0.9rem;
        color: #4fc3f7;
        font-weight: bold;
    }

    .footer {
        background: #111;
        color: #bbb;
        text-align: center;
        padding: 50px 20px;
    }

    @keyframes slideDown {
        from { opacity: 0; transform: translateY(-30px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .no-courses {
        text-align: center;
        grid-column: 1 / -1;
        padding: 40px;
        color: #666;
    }
</style>