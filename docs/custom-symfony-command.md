---
title: Eigener Symfony Befehl
---

# Einen eigenes Kommandozeilenprogramm für Symfony erstellen.

## Kommando in der Extension-Klasse laden

Es muss lediglich die folgende Zeile in die `load()` Funktion der `Extension` Klasse hinzugefügt werden.

```php
$loader->load('commands.yml');
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
        // diese Zeile wurde hinzugefügt
        $loader->load('commands.yml');
    }
}
```

## Den Kommando via YAML registrieren

Es muss eine Datei `commands.yml` im Ordner `src/Resources/config` erstellt werden:

`src/Resources/config/commands.yml`

```yml
services:
    bundle.command.test:
        class: Vendor\Bundle\Command\TestCommand
        tags: ["console.command"]
        calls:
            - ["setFramework", ["@contao.framework"]]
```

## Kommando Klasse anlegen

Im folgenden wird eine Klasse im Ordner `src/Command` angelegt. In unserem Beispiel trägt die Datei den Namen `TestCommand.php`:

`src/Command/TestCommand.php`

```php
<?php declare(strict_types = 1);
namespace Vendor\Bundle\Command;

use Contao\CoreBundle\Command\AbstractLockedCommand;
use Esit\Xmlcatchregion\Classes\Events\Import\OnImportEvent;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

class TestCommand extends AbstractLockedCommand
{
    use FrameworkAwareTrait;

    private $io;
    private $rows = [];
    private $statusCode = 0;

    protected function configure(): void
    {
        $commandHelp    = 'Erzeugt eine Testausgabe';
        $parameterHelp  = 'Name, der in der Testausgabe verwendet werden soll';
        $argument       = new InputArgument('name', InputArgument::REQUIRED, $parameterHelp);
        // Hier könnten weitere Parameter folgen.
        $this->setName('command:test')
             ->setDefinition([$argument])   // Die Parameter werden als Array übergeben, so kann es mehr als ein geben.
             ->setDescription($commandHelp);
    }
    protected function executeLocked(InputInterface $input, OutputInterface $output): ?int
    {
        // Framework initialisieren
        $this->framework->initialize();

        $this->io = new SymfonyStyle($input, $output);

        // Der Container steht im Konstruktor noch nicht zur Verfügung und kann somit nicht injiziert werden!
        $this->di = $this->getContainer()->get('event_dispatcher');

        // TL_ROOT kann nicht injiziert werden und steht im Command nicht zur Verfügung!
        // Deshalb wird hier das root directory ausgelesen.
        $rootDir = $this->getContainer()->getParameter('kernel.project_dir');

        // Hier wird der Kommandozeilenparameter ausgelesen.
        $name = $input->getArgument('name');

        // Hier wird die eigentliche Verarbeitung auf gerufen.
        $this->testOutput($name);
        if (!empty($this->rows)) {
            $this->io->newLine();
            $this->io->table(['', 'Ouput', 'Target / Error'], $this->rows);
        }
        return $this->statusCode;
    }
    protected function testOutput($name): void
    {
        // Hier findet die eigentliche Verarbeitung statt.
        // Normalerweise würde hier z.B. ein Event aufgerufen.
        $this->io->text("Hallo $name!");
    }
}
```

## Den Kommando von der Konsole ausführen

```bash
vendor/bin/contao-console command:test
```

### Geschafft !

Du solltest die gewünschte Ausgabe bekommen. Dieses Beispiel kann nun komplett nach deinen eigenen Wünschen erweitert werden.
