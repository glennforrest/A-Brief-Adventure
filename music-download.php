<?php
    header('Content-Type: application/download');
    header('Content-Disposition: attachment; filename="A-Brief-Adventure-Music.mp3"');
    header("Content-Length: " . filesize("assets/sound/A-Brief-Adventure-Music.mp3"));

    $fp = fopen("assets/sound/A-Brief-Adventure-Music.mp3", "r");
    fpassthru($fp);
    fclose($fp);
