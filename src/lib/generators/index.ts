import type { Generator, OutputFormat } from './types';
import { SvgGenerator } from './svg';
import { PngGenerator } from './png';
import { JpgGenerator } from './jpg';

const generators: Record<OutputFormat, Generator> = {
  png: PngGenerator,
  svg: SvgGenerator,
  jpg: JpgGenerator
};

export function getGenerator(format: OutputFormat): Generator {
  return generators[format];
}