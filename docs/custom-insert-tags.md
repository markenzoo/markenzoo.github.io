---
title: Eigene Insert Tags
---

# Eigener Contao Insert-Tag

Contao bietet die Möglichkeit Elemente auf eine sehr einfach Weise an verschiedenen Stellen der Webseite wiederzuverwenden. Das ganze geschieht über sogenannte `Insert-Tags` in der Form `{ {tag::*} }`. Um sich das Entwickeln eigener Erweiterungen deutlich zu vereinfachen, kann man sich eigene Inserttags erstellen. Das ganze geschieht über eine eigene Klasse, die die entsprechende Funktionalität bereitstellt und den gewünschten Inhalt ersetzt. Dazu wird ein Listener angelegt, welcher die Methoden der Klasse aufruft.

## Listener in der Extension-Klasse registrieren

Es muss lediglich die folgende Zeile in die `load()` Funktion der `Extension` Klasse hinzugefügt werden.

```php
$loader->load('listener.yml');
```

Die `Extension` Klasse sollte nun wie folgt aussehen:

```php
<?php
namespace  Vendor\Bundle\DependencyInjection;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Extension\Extension;
use Symfony\Component\DependencyInjection\Loader\YamlFileLoader;
class VendorBundleExtension extends Extension
{
    public function load(array $mergedConfig, ContainerBuilder $container): void
    {
        $loader = new YamlFileLoader(
            $container,
            new FileLocator(__DIR__ . '/../Resources/config')
        );
        $loader->load('commands.yml');

        // diese Zeile wurde hinzugefügt
        $loader->load('listener.yml');
    }
}
```

## Den Listener via YAML definieren

Damit man den Listener aufrufen kann, muss dieser zunächst in der `listener.yml` im Ordner `src/Resources/config` erstellt und einer PHP-Klasse zugewiesen werden:

`src/Resources/config/listener.yml`

```yml
services:
    helper.listener.insert_tags:
        class: Vendor\Bundle\EventListener\InsertTagsListener
        public: true
        arguments:
            - "@contao.framework"
```

## Contao Hook für den Listener registrieren

Damit Contao eine bestimmte Funktion des angelegten Listeners ausführt, registriert man den Callback für ein durch Contao aufgerufenes Event. Dies geschieht mittels Config DCA in der Datei `src/Resources/contao/config.php`:

```php
/**
 * Register hooks
 */
$GLOBALS['TL_HOOKS']['replaceInsertTags'][] = array('helper.listener.insert_tags', 'onReplaceInsertTags');
```

## Listener Klasse anlegen

Die entsprechende Listener Klasse wird im Ordner `EventListener` der Erweiterung angelegt:
In diesem Beispiel wird nach einem Artikel mit der entsprechenden ID gesucht und dieser eingebunden. Für diesen Sachverhalt bringt Contao tatsächlich bereits von Hause aus einen Insert-Tag mit `{ {article::*} }`. Das ganze soll lediglich veranschaulichen, wie man selber Inserttags definieren kann. Fügt man beispielsweise der Tabelle `tl_article` noch eine weitere Spalte hinzu, könnte man diese verwenden. Auch lässt sich das ganze auf weitere Contao Klassen ausweiten und ist nicht auf Artikel beschränkt. Dazu einfach die `switch` - Anweisung und das `$this->framework->getAdapter(*::class);` sowie `$adapter->findOneBy(...)` anpassen.

```php
namespace Vendor\Bundle\EventListener\EventListener;

use Contao\ArticleModel;
use Contao\ContentElement;
use Contao\CoreBundle\Framework\ContaoFrameworkInterface;

class InsertTagsListener
{

    private $framework;
    private $supportedTags = [ 'tag' ];

    public function __construct(ContaoFrameworkInterface $framework)
    {
        $this->framework = $framework;
    }

    public function onReplaceInsertTags($tag)
    {
        $elements = explode('::', $tag);    // divide the tag string at the '::'
        $key = strtolower($elements[0]);    // convert first part to lowercase string
        if (\in_array($key, $this->supportedTags, true)) {  // check if the tag is supported from this class
            return $this->replaceInsertTag($elements[1], $elements[2]);   // Replaces an event-related insert tag.
        }
        return false;
    }

    private function replaceInsertTag($tagType, $tagParam)
    {
        $this->framework->initialize();
        switch ($tagType) {
            // get article content by id
            case 'article':
                $adapter = $this->framework->getAdapter(ArticleModel::class);
                if (null === ($article = $adapter->findOneBy('id', $tagParam))) {
                    return '';
                }
                return $this->generateArticleReplacement($article);
                break;
        }
        return false;
    }

    private function generateArticleReplacement(ArticleModel $article)
    {
        $adapter = $this->framework->getAdapter(ContentElement::class);
        return $adapter->getArticle($article);
    }
}
```
