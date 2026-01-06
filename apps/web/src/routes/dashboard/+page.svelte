<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Správa kurzu - Podklady</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: Arial, sans-serif; }
        body { background: #f4f4f4; color: #333; }
        
        .menu {
            height: 70px; position: sticky; top: 0; z-index: 1000;
            background: #111; color: #fff; padding: 0px 30px;
            display: flex; align-items: center; justify-content: space-between;
            animation: slideDown 1s ease;
        }
        .menu-left { display: flex; align-items: center; gap: 40px; flex: 1; }
        .logo { font-size: 24px; font-weight: bold; color: #4fc3f7; cursor: pointer; transition: transform 0.3s; }
        .logo:hover { transform: scale(1.1) rotate(-2deg); }
        .logomain { height: 50px; }
        .login { cursor: pointer; padding: 8px 16px; border: 1px solid #06141b; border-radius: 10px; transition: all 0.3s ease; }
        .login:hover { background: #06141b; color: white; transform: scale(1.05); }
        .section { padding: 80px 15%; animation: fadeUp 1.2s ease; }
        .section-quote { background: #fff; text-align: center; font-size: 28px; font-weight: bold; }
        .footer { background: #111; color: #bbb; text-align: center; padding: 50px 20px; }
        .footer p { margin: 10px 0; }

        .materials-section {
            background-color: #000000;
            padding: 40px;
            border-radius: 8px;
            margin-top: 20px;
        }

        .forms-container {
            display: flex;
            gap: 20px;
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: 40px;
        }

        .upload-box {
            background-color: #aeaeae;
            padding: 20px;
            width: 45%;
            min-width: 300px;
            border-radius: 5px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .upload-box h3 {
            text-align: center;
            margin-bottom: 15px;
            color: #000;
        }

        .form-group { margin-bottom: 15px; }
        
        .form-group label { display: block; margin-bottom: 5px; font-weight: bold; font-size: 14px; }
        
        .form-group input, .form-group textarea {
            width: 100%;
            padding: 10px;
            border: none;
            background: #000;
            color: #fff;
            border-radius: 4px;
        }
        
        .form-group input::placeholder, .form-group textarea::placeholder { color: #ccc; }

        .btn-add {
            background-color: #66bb6a;
            color: white;
            border: none;
            padding: 10px 20px;
            width: 100%;
            cursor: pointer;
            font-weight: bold;
            border-radius: 4px;
            margin-top: 10px;
            transition: background 0.3s;
        }
        .btn-add:hover { background-color: #4caf50; }

        .materials-list-container {
            background-color: #e6e6e6;
            padding: 20px;
            min-height: 150px;
            border-radius: 5px;
        }

        .material-item {
            background: white;
            padding: 15px;
            margin-bottom: 10px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-left: 5px solid #333;
        }

        .item-info { flex: 1; }
        .item-title { font-weight: bold; font-size: 16px; }
        .item-desc { font-size: 13px; color: #666; margin-top: 4px; }
        .item-meta { font-size: 11px; color: #999; margin-top: 4px; }

        .item-actions {
            display: flex;
            gap: 10px;
        }

        .btn-icon {
            border: none;
            background: none;
            cursor: pointer;
            font-size: 16px;
            padding: 5px;
            transition: color 0.2s;
        }
        .btn-delete { color: #e53935; }
        .btn-edit { color: #fb8c00; }
        .btn-download { color: #1e88e5; }

        @keyframes slideDown { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
    </style>
</head>
<body>

    <div class="wrapper2">
        <div class="wrapper1">
            <div class="menu">
                <div class="menu-left">
                    <div class="logo">Think Different Academy</div> 
                    <div class="nav"></div>
                </div>
                <div class="login">Profil</div>
            </div>

            <div class="section section-quote">
                <h1>Nadpis Kurzu</h1>
            </div>

            <div class="section section-text" style="display: block;">
                
                <h2 style="text-align: center; margin-bottom: 20px;">Správa studijních podkladů</h2>

                <div class="materials-section">
                    
                    <div class="forms-container">
                        
                        <div class="upload-box">
                            <h3>Soubor</h3>
                            <div class="form-group">
                                <input type="text" id="fileName" placeholder="Název souboru (např. Skripta PDF)">
                            </div>
                            <div class="form-group">
                                <textarea id="fileDesc" rows="2" placeholder="Krátký popis..."></textarea>
                            </div>
                            <div class="form-group">
                                <input type="file" id="fileInput" style="background: white; color: black; cursor: pointer;">
                                <small style="color: #eee; font-size: 11px;">Max. 30 MB (PDF, DOCX, JPG, MP4...)</small>
                            </div>
                            <button class="btn-add" onclick="addFile()">Nahrát soubor</button>
                        </div>

                        <div class="upload-box">
                            <h3>Odkaz (URL)</h3>
                            <div class="form-group">
                                <input type="text" id="linkName" placeholder="Název odkazu">
                            </div>
                            <div class="form-group">
                                <textarea id="linkDesc" rows="2" placeholder="Krátký popis..."></textarea>
                            </div>
                            <div class="form-group">
                                <input type="url" id="linkUrl" placeholder="https://www.example.com">
                            </div>
                            <button class="btn-add" onclick="addLink()">Přidat odkaz</button>
                        </div>
                    </div>

                    <div class="materials-list-container" id="materialsList">
                        <p style="text-align: center; color: #555; padding-top: 50px;" id="emptyMsg">Zatím nebyly přidány žádné podklady.</p>
                        </div>

                </div>
            </div>

            <div class="footer">
                <p>Kontakt: info@example.com</p>
                <p>&copy; 2025 Moje Webová Stránka</p>
            </div>
        </div>
    </div>

    <script>
        const materialsList = document.getElementById('materialsList');
        const emptyMsg = document.getElementById('emptyMsg');

        function addFile() {
            const title = document.getElementById('fileName').value;
            const desc = document.getElementById('fileDesc').value;
            const fileInput = document.getElementById('fileInput');
            const file = fileInput.files[0];

            if (!title || !file) {
                alert("Prosím vyplňte název a vyberte soubor.");
                return;
            }

            const maxSize = 30 * 1024 * 1024;
            if (file.size > maxSize) {
                alert("CHYBA: Soubor je příliš velký! Maximální povolená velikost je 30 MB.");
                return;
            }

            const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'audio/mpeg', 'text/plain', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

            renderItem('file', title, desc, file.name);
            
            document.getElementById('fileName').value = '';
            document.getElementById('fileDesc').value = '';
            fileInput.value = '';
        }

        function addLink() {
            const title = document.getElementById('linkName').value;
            const desc = document.getElementById('linkDesc').value;
            const url = document.getElementById('linkUrl').value;

            if (!title || !url) {
                alert("Prosím vyplňte název a URL adresu.");
                return;
            }

            renderItem('link', title, desc, url);

            document.getElementById('linkName').value = '';
            document.getElementById('linkDesc').value = '';
            document.getElementById('linkUrl').value = '';
        }

        function renderItem(type, title, desc, source) {

            if (emptyMsg) emptyMsg.style.display = 'none';

            const itemDiv = document.createElement('div');
            itemDiv.className = 'material-item';
            

            let iconClass = type === 'file' ? 'fa-file-alt' : 'fa-link';
            if(type === 'file' && source.endsWith('.pdf')) iconClass = 'fa-file-pdf';
            if(type === 'file' && source.endsWith('.jpg')) iconClass = 'fa-file-image';

            const sourceDisplay = type === 'file' 
                ? `<span style="color: #666; font-size: 11px;">(Soubor: ${source})</span>` 
                : `<a href="${source}" target="_blank" style="color: #1e88e5; font-size: 11px;">${source}</a>`;

            itemDiv.innerHTML = `
                <div style="margin-right: 15px; font-size: 24px; color: #555;">
                    <i class="fas ${iconClass}"></i>
                </div>
                <div class="item-info">
                    <div class="item-title">${title}</div>
                    <div class="item-desc">${desc}</div>
                    <div class="item-meta">${sourceDisplay}</div>
                </div>
                <div class="item-actions">
                    <button class="btn-icon btn-download" title="Stáhnout/Otevřít"><i class="fas fa-external-link-alt"></i></button>
                    <button class="btn-icon btn-edit" title="Upravit"><i class="fas fa-pen"></i></button>
                    <button class="btn-icon btn-delete" onclick="this.parentElement.parentElement.remove()" title="Smazat"><i class="fas fa-trash"></i></button>
                </div>
            `;

            materialsList.insertBefore(itemDiv, materialsList.firstChild);
        }
    </script>
</body>
</html>


