kaitai-dts
==========

Experimental type generator for Kaitai structs.

> Note: This is not intended to be a full-featured type generator - it's just a stopgap until the kaitai compiler gets TypeScript support (kaitai-io/kaitai_struct_compiler#165, kaitai-io/kaitai_struct_compiler#233). I'm not going to put much effort into this, though contributions are welcome.

## Installation

```sh
$ npm i -g @tschrock/kaitai-dts
```

## Usage

```sh
$ kaitai-dts <struct_file>
```

For example: 
```sh
$ kaitai-dts ./my-data.ksy
```

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
