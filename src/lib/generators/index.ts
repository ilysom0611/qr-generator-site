import type { Generator, OutputFormat } from './types';
import { SvgGenerator } from './svg';
// PngGenerator, JpgGenerator added in Task 7

const generators: Record<OutputFormat, Generator> = {
  svg: SvgGenerator
  // png: PngGenerator,  // Task 7
  // jpg: JpgGenerator   // Task 7
};

export function getGenerator(format: OutputFormat): Generator {
  const g = generators[format];
  if (!g) throw new Error(`Generator for format "${format}" not yet implemented`);
  return g;
}