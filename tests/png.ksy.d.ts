// This file was auto-generated. If this file is regenerated, all changes will be lost.
import KaitaiStream from 'kaitai-struct/KaitaiStream';
export class Png {
    magic: Uint8Array;
    ihdrLen: number;
    ihdrType: Uint8Array;
    ihdr: Png.IhdrChunk;
    ihdrCrc: Uint8Array;
    chunks: Array<Png.Chunk>;
    constructor(_io: KaitaiStream, _parent?: any, _root?: any);
    _read(): void;
}
export namespace Png {
    enum ColorType {
        GREYSCALE = 0,
        TRUECOLOR = 2,
        INDEXED = 3,
        GREYSCALE_ALPHA = 4,
        TRUECOLOR_ALPHA = 6,
    }
    enum PhysUnit {
        UNKNOWN = 0,
        METER = 1,
    }
    enum CompressionMethods {
        ZLIB = 0,
    }
    enum DisposeOpValues {
        NONE = 0,
        BACKGROUND = 1,
        PREVIOUS = 2,
    }
    enum BlendOpValues {
        SOURCE = 0,
        OVER = 1,
    }
    class Chunk {
        len: number;
        type: string;
        body: PlteChunk | ChrmChunk | GamaChunk | SrgbChunk | BkgdChunk | PhysChunk | TimeChunk | InternationalTextChunk | TextChunk | CompressedTextChunk | AnimationControlChunk | FrameControlChunk | FrameDataChunk;
        crc: Uint8Array;
        constructor(_io: KaitaiStream, _parent?: any, _root?: any);
        _read(): void;
    }
    class IhdrChunk {
        width: number;
        height: number;
        bitDepth: number;
        colorType: ColorType;
        compressionMethod: number;
        filterMethod: number;
        interlaceMethod: number;
        constructor(_io: KaitaiStream, _parent?: any, _root?: any);
        _read(): void;
    }
    class PlteChunk {
        entries: Array<Rgb>;
        constructor(_io: KaitaiStream, _parent?: any, _root?: any);
        _read(): void;
    }
    class Rgb {
        r: number;
        g: number;
        b: number;
        constructor(_io: KaitaiStream, _parent?: any, _root?: any);
        _read(): void;
    }
    class ChrmChunk {
        whitePoint: Point;
        red: Point;
        green: Point;
        blue: Point;
        constructor(_io: KaitaiStream, _parent?: any, _root?: any);
        _read(): void;
    }
    class Point {
        xInt: number;
        yInt: number;
        get x(): unknown;
        get y(): unknown;
        constructor(_io: KaitaiStream, _parent?: any, _root?: any);
        _read(): void;
    }
    class GamaChunk {
        gammaInt: number;
        get gammaRatio(): unknown;
        constructor(_io: KaitaiStream, _parent?: any, _root?: any);
        _read(): void;
    }
    class SrgbChunk {
        renderIntent: SrgbChunk.Intent;
        constructor(_io: KaitaiStream, _parent?: any, _root?: any);
        _read(): void;
    }
    namespace SrgbChunk {
        enum Intent {
            PERCEPTUAL = 0,
            RELATIVE_COLORIMETRIC = 1,
            SATURATION = 2,
            ABSOLUTE_COLORIMETRIC = 3,
        }
    }
    class BkgdChunk {
        bkgd: BkgdGreyscale | BkgdTruecolor | BkgdIndexed;
        constructor(_io: KaitaiStream, _parent?: any, _root?: any);
        _read(): void;
    }
    class BkgdGreyscale {
        value: number;
        constructor(_io: KaitaiStream, _parent?: any, _root?: any);
        _read(): void;
    }
    class BkgdTruecolor {
        red: number;
        green: number;
        blue: number;
        constructor(_io: KaitaiStream, _parent?: any, _root?: any);
        _read(): void;
    }
    class BkgdIndexed {
        paletteIndex: number;
        constructor(_io: KaitaiStream, _parent?: any, _root?: any);
        _read(): void;
    }
    class PhysChunk {
        pixelsPerUnitX: number;
        pixelsPerUnitY: number;
        unit: PhysUnit;
        constructor(_io: KaitaiStream, _parent?: any, _root?: any);
        _read(): void;
    }
    class TimeChunk {
        year: number;
        month: number;
        day: number;
        hour: number;
        minute: number;
        second: number;
        constructor(_io: KaitaiStream, _parent?: any, _root?: any);
        _read(): void;
    }
    class InternationalTextChunk {
        keyword: string;
        compressionFlag: number;
        compressionMethod: CompressionMethods;
        languageTag: string;
        translatedKeyword: string;
        text: string;
        constructor(_io: KaitaiStream, _parent?: any, _root?: any);
        _read(): void;
    }
    class TextChunk {
        keyword: string;
        text: string;
        constructor(_io: KaitaiStream, _parent?: any, _root?: any);
        _read(): void;
    }
    class CompressedTextChunk {
        keyword: string;
        compressionMethod: CompressionMethods;
        textDatastream: Uint8Array;
        constructor(_io: KaitaiStream, _parent?: any, _root?: any);
        _read(): void;
    }
    class AnimationControlChunk {
        numFrames: number;
        numPlays: number;
        constructor(_io: KaitaiStream, _parent?: any, _root?: any);
        _read(): void;
    }
    class FrameControlChunk {
        sequenceNumber: number;
        width: number;
        height: number;
        xOffset: number;
        yOffset: number;
        delayNum: number;
        delayDen: number;
        disposeOp: DisposeOpValues;
        blendOp: BlendOpValues;
        get delay(): unknown;
        constructor(_io: KaitaiStream, _parent?: any, _root?: any);
        _read(): void;
    }
    class FrameDataChunk {
        sequenceNumber: number;
        frameData: Uint8Array;
        constructor(_io: KaitaiStream, _parent?: any, _root?: any);
        _read(): void;
    }
}