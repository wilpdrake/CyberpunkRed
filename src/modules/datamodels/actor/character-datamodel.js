import LOGGER from "../../utils/cpr-logger.js";
import CPRSystemDataModel from "../abstract.js";
import CommonSchema from "./mixins/common-schema.js";
import LedgerSchema from "./components/ledger-schema.js";
import LifestyleSchema from "./components/lifestyle-schema.js";
import WealthSchema from "./mixins/wealth-schema.js";
import ContainerSchema from "../shared/container-schema.js";

export default class CharacterDataModel extends CPRSystemDataModel.mixin(
  CommonSchema,
  ContainerSchema,
  WealthSchema
) {
  static defineSchema() {
    LOGGER.trace("defineSchema | CharacterDataModel | called.");
    const { fields } = foundry.data;
    return this.mergeSchema(
      super.defineSchema({
        initialAllowedTypes: ["cyberware"],
        includeSlots: false,
      }),
      {
        improvementPoints: new fields.SchemaField(LedgerSchema.defineSchema()),
        lifepath: new fields.SchemaField({
          aboutPeople: new fields.HTMLField({ initial: "" }),
          affectations: new fields.HTMLField({ initial: "" }),
          childhoodEnvironment: new fields.HTMLField({ initial: "" }),
          clothingStyle: new fields.HTMLField({ initial: "" }),
          culturalOrigin: new fields.HTMLField({ initial: "" }),
          enemies: new fields.HTMLField({ initial: "" }),
          familyBackground: new fields.HTMLField({ initial: "" }),
          familyCrisis: new fields.HTMLField({ initial: "" }),
          friends: new fields.HTMLField({ initial: "" }),
          hairStyle: new fields.HTMLField({ initial: "" }),
          lifeGoals: new fields.HTMLField({ initial: "" }),
          personality: new fields.HTMLField({ initial: "" }),
          roleLifepath: new fields.HTMLField({ initial: "" }),
          tragicLoveAffairs: new fields.HTMLField({ initial: "" }),
          valueMost: new fields.HTMLField({ initial: "" }),
          valuedPerson: new fields.HTMLField({ initial: "" }),
          valuedPossession: new fields.HTMLField({ initial: "" }),
        }),
        lifestyle: new fields.SchemaField({
          extras: new fields.SchemaField(
            LifestyleSchema.defineSchema(true, {
              initialCost: 100,
            })
          ),
          fashion: new fields.SchemaField({
            desription: new fields.HTMLField(),
          }),
          housing: new fields.SchemaField(
            LifestyleSchema.defineSchema(true, {
              initialCost: 1000,
              initialDescription: "Cargo Container",
            })
          ),
          lifeStyle: new fields.SchemaField(
            LifestyleSchema.defineSchema(true, {
              initialCost: 100,
              initialDescription: "Kibble",
            })
          ),
          traumaTeam: new fields.SchemaField(
            LifestyleSchema.defineSchema(true)
          ),
        }),
      }
    );
  }

  get seriouslyWounded() {
    LOGGER.trace("get seriouslyWounded");
    return Math.ceil(this.parent.system.derivedStats.hp.max / 2);
  }
}
