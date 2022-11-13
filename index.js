var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SensenVisualKit_instances, _SensenVisualKit_element, _SensenVisualKit_canvas, _SensenVisualKit_reposiroty, _SensenVisualKit_mount, _VisualKitDeclaration_entries, _VisualKitProperty_entries, _VisualKitProperty_element;
import MetricRandom from "sensen-metric-random";
export class VisualKitStyle {
    static toPropertyName(value) {
        return value.replace(/([A-Z])/g, `-$&`).toLowerCase();
    }
    static fromPropertyName(value) {
        return value.replace(/(?:^\w|[A-Z]|\b\w)/g, (text, index) => index === 0 ? text.toLowerCase() : text.toUpperCase()).replace(/\s+/g, '');
    }
    static parse(structure) {
        return Object.entries(structure || {}).map(e => {
            return `${this.parseProperty(e[0])}:${this.parseValue(e[1])};`;
        });
    }
    static parseProperty(property) {
        return this.toPropertyName(property);
    }
    static parseValue(value) {
        return value;
    }
}
export class SensenVisualKit {
    constructor(element) {
        _SensenVisualKit_instances.add(this);
        this.name = '';
        _SensenVisualKit_element.set(this, null);
        _SensenVisualKit_canvas.set(this, {});
        _SensenVisualKit_reposiroty.set(this, null);
        this.declarations = new VisualKitDeclaration();
        __classPrivateFieldSet(this, _SensenVisualKit_element, element, "f");
        __classPrivateFieldSet(this, _SensenVisualKit_reposiroty, document.head, "f");
        this.name = MetricRandom.CreateAplpha(16).join('');
        this.property = new VisualKitProperty(element);
    }
    get target() { return __classPrivateFieldGet(this, _SensenVisualKit_element, "f"); }
    define(declaration) {
        this.declarations.define(declaration);
        return this;
    }
    use(name) {
        this.name = name || this.name;
        __classPrivateFieldGet(this, _SensenVisualKit_instances, "m", _SensenVisualKit_mount).call(this, this.name, this.declarations);
        return this;
    }
    append(name) {
        __classPrivateFieldGet(this, _SensenVisualKit_reposiroty, "f")?.append(__classPrivateFieldGet(this, _SensenVisualKit_canvas, "f")[name || this.name]);
        return this;
    }
    sheet(sheet) {
        __classPrivateFieldGet(this, _SensenVisualKit_instances, "m", _SensenVisualKit_mount).call(this, sheet.name, sheet.declarations);
        return this;
    }
}
_SensenVisualKit_element = new WeakMap(), _SensenVisualKit_canvas = new WeakMap(), _SensenVisualKit_reposiroty = new WeakMap(), _SensenVisualKit_instances = new WeakSet(), _SensenVisualKit_mount = function _SensenVisualKit_mount(name, declarations) {
    __classPrivateFieldGet(this, _SensenVisualKit_canvas, "f")[name] = __classPrivateFieldGet(this, _SensenVisualKit_canvas, "f")[name] || document.createElement('style');
    if (__classPrivateFieldGet(this, _SensenVisualKit_canvas, "f")) {
        __classPrivateFieldGet(this, _SensenVisualKit_canvas, "f")[name].innerHTML = (`[visual-kit~="${name}"] { ${declarations.value.join(' ')} }`);
        this.property.add(name).link();
    }
    __classPrivateFieldGet(this, _SensenVisualKit_canvas, "f")[name].setAttribute('visualkit:canvas', `${name}`);
    return this.append(name);
};
export class VisualKitDeclaration {
    constructor() {
        _VisualKitDeclaration_entries.set(this, {});
    }
    get value() { return VisualKitStyle.parse(__classPrivateFieldGet(this, _VisualKitDeclaration_entries, "f")); }
    define(declaration) {
        __classPrivateFieldSet(this, _VisualKitDeclaration_entries, { ...__classPrivateFieldGet(this, _VisualKitDeclaration_entries, "f"), ...declaration }, "f");
        return this;
    }
    remove(property) {
        let clone = {};
        Object.entries(__classPrivateFieldGet(this, _VisualKitDeclaration_entries, "f")).map(({ 0: name, 1: value }) => {
            if (name != property) {
                clone = { ...clone, ...{ name: value } };
            }
        });
        __classPrivateFieldSet(this, _VisualKitDeclaration_entries, clone, "f");
        return this;
    }
    replace(older, value) {
        return this.remove(older).define(value);
    }
    contains(property) {
        let found = false;
        Object.entries(__classPrivateFieldGet(this, _VisualKitDeclaration_entries, "f")).map(({ 0: name }) => {
            if (name == property) {
                found = true;
            }
        });
        return found;
    }
}
_VisualKitDeclaration_entries = new WeakMap();
export class VisualKitProperty {
    constructor(element) {
        _VisualKitProperty_entries.set(this, []);
        _VisualKitProperty_element.set(this, null);
        __classPrivateFieldSet(this, _VisualKitProperty_element, element, "f");
    }
    get codex() { return 'visual-kit'; }
    get payload() { return __classPrivateFieldGet(this, _VisualKitProperty_entries, "f"); }
    get value() { return __classPrivateFieldGet(this, _VisualKitProperty_entries, "f").join(' '); }
    add(value) {
        if (!this.contains(value)) {
            __classPrivateFieldGet(this, _VisualKitProperty_entries, "f").push(value);
        }
        return this;
    }
    remove(value) {
        __classPrivateFieldSet(this, _VisualKitProperty_entries, __classPrivateFieldGet(this, _VisualKitProperty_entries, "f").filter(entry => entry != value), "f");
        return this;
    }
    replace(older, value) {
        return this.remove(older).add(value);
    }
    contains(value) {
        return __classPrivateFieldGet(this, _VisualKitProperty_entries, "f").includes(value, 0);
    }
    link() {
        __classPrivateFieldGet(this, _VisualKitProperty_element, "f")?.setAttribute(this.codex, `${this.value}`);
        return this;
    }
    unlink(property) {
        if (property) {
            if (Array.isArray(property)) {
                property.map(prop => this.remove(prop));
            }
            __classPrivateFieldGet(this, _VisualKitProperty_element, "f")?.setAttribute(this.codex, `${this.value}`);
        }
        else {
            __classPrivateFieldGet(this, _VisualKitProperty_element, "f")?.removeAttribute(this.codex);
        }
        return this;
    }
}
_VisualKitProperty_entries = new WeakMap(), _VisualKitProperty_element = new WeakMap();
export class Kit {
    constructor(name, declarations) {
        this.name = '';
        this.declarations = new VisualKitDeclaration();
        this.name = name;
        this.declarations.define(declarations || {});
    }
}
export default function useVisualKit(element) {
    return new SensenVisualKit(element);
}
