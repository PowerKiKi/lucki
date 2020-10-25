<?php

function get(string $url, bool $useCache = true): string
{
    @mkdir('cache');
    $filename = 'cache/' . preg_replace('~[^\w.]~', '-', $url);

    if ($useCache && is_readable($filename)) {
        return file_get_contents($filename);
    }

    $result = file_get_contents($url);
    file_put_contents($filename, $result);

    return $result;
}

function getImageUrl(string $itemUrl): string
{
    $itemContent = get($itemUrl);

    $dom = new DOMDocument('1.0', 'UTF-8');
    @$dom->loadHTML($itemContent);

    // <meta property="og:image" content="https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&amp;fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcarWmU%2FbtqLkhh6j6v%2FS5XsUtGWO3JTKrLq31IP9k%2Fimg.jpg">
    $xpath = new \DOMXPath($dom);
    /** @var \DomElement $meta */
    foreach ($xpath->evaluate('//meta[@property="og:image"]') as $meta) {
        return $meta->getAttribute('content');
    }

    return '';
}

function addImagesToFeed(string $content): string
{
    $dom = new DOMDocument('1.0', 'UTF-8');
    $dom->formatOutput = true;

    $dom->loadXML($content);
    $namespace = 'http://search.yahoo.com/mrss/';

    $dom->firstChild->setAttribute('xmlns:media', $namespace);

    $xpath = new \DOMXPath($dom);
    /** @var \DomElement $item */
    foreach ($xpath->evaluate('//item') as $item) {
        $link = $item->getElementsByTagName('link')[0];

        $itemUrl = $link->textContent;

        $imageUrl = getImageUrl($itemUrl);

        if ($imageUrl) {
            //<media:content url="http://pottedplanter.com/example.jpg" type="image/jpg">
            $content = $dom->createElement('media:content');
            $content->setAttribute('url', $imageUrl);
            $content->setAttribute('type', 'image/jpg');

            $item->appendChild($content);
        }
    }

    $dom->save('cache/result.xml');

    return $dom->saveXML();

}

$url = 'https://www.lucki.kr/feed';
$feed = get($url, true);

header('Content-Type: text/xml; charset=utf-8');
echo addImagesToFeed($feed);

