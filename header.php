<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $pageTitle; ?> - The Expatlives</title>
    <link href="css/styles.css" rel="stylesheet">
    <link rel="icon" href="images/favicon.png" type="image/png">
    <script src="https://kit.fontawesome.com/bf07ff0e11.js" crossorigin="anonymous"></script>
    <!-- Add your common CSS here -->
</head>
<body>
    <header>
        <nav>
            <a href="index.html" class="logo">
                <i class="fas fa-globe-americas"></i>
                <span>The Expatlives </span>
            </a>
            <button type="button" class="hamburger" aria-label="Menu">
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
            </button>
            <ul class="nav-list">
                <li class="nav-item">
                    <a href="#" class="nav-link">Coaching ▾</a>
                    <div class="dropdown-content">
                        <a href="ielts.html">IELTS</a>
                        <a href="pte.html">PTE</a>
                        <div class="has-nested">
                            <a href="#">Foreign languages ▸</a>
                            <div class="nested-dropdown">
                                <a href="french.html">French</a>
                                <a href="german.html">German</a>
                                <a href="spaniish.html">Spanish</a>
                                <a href="japanese.html">Japanese</a>
                                <a href="chinese.html">Mandarin</a>
                                <a href="polish.html">Polish</a>
                            </div>
                        </div>
                        <a href="campustocorporat.html">Campus to corporate</a>
                    </div>
                </li>
                <li class="nav-item">
                    <a href="visa.html" class="nav-link">Visas</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link">Study In ▾</a>
                    <div class="dropdown-content">
                        <a href="uk.html">UK</a>
                        <a href="usa.html">USA</a>
                        <a href="germany.html">Germany</a>
                        <a href="australia.html">Australia</a>
                        <a href="newzealand.html">New Zealand</a>
                        <a href="ireland.html">Ireland</a>
                        <a href="canada.html">Canada</a>
                    </div>
                </li>
                <li class="nav-item">
                    <a href="consulting.html" class="nav-link">Consulting</a>
                </li>
                <li class="nav-item">
                    <a href="aboutus.html" class="nav-link">About us</a>
                </li>
            </ul>
        </nav>
    </header>