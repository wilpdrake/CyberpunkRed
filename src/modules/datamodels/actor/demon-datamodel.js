import LOGGER from "../../utils/cpr-logger.js";
import CPRSystemDataModel from "../abstract.js";
import HpSchema from "./components/hp-schema.js";

export default class DemonDataModel extends CPRSystemDataModel.mixin() {
  static defineSchema() {
    LOGGER.trace("defineSchema | DemonDataModel | called.");
    const { fields } = foundry.data;
    return this.mergeSchema(super.defineSchema(), {
      stats: new fields.SchemaField({
        rez: new fields.SchemaField(HpSchema.defineSchema(10)),
        interface: new fields.NumberField({
          required: true,
          nullable: false,
          integer: true,
          initial: 0,
          min: 0,
        }),
        actions: new fields.NumberField({
          required: true,
          nullable: false,
          integer: true,
          initial: 2,
          min: 0,
        }),
        combatNumber: new fields.NumberField({
          required: true,
          nullable: false,
          integer: true,
          initial: 14,
          min: 0,
        }),
      }),
      notes: new fields.HTMLField(),
    });
  }
}
