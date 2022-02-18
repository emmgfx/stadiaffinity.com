import Hashids from "hashids";

const hashids = new Hashids("salt", 8);

const encodeId = (plain) => hashids.encode(plain);
const decodeId = (encoded) => hashids.decode(encoded)[0];

export { encodeId, decodeId };
