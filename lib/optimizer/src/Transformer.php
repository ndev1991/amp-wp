<?php

namespace Amp\Optimizer;

// @todo The Document class should not be WP-specific.
use Amp\Dom\Document;

interface Transformer
{

    /**
     * Apply transformations to the provided DOM document.
     *
     * @param Document        $document DOM document to apply the transformations to.
     * @param ErrorCollection $errors   Collection of errors that are collected during transformation.
     * @return void
     */
    public function transform(Document $document, ErrorCollection $errors);
}