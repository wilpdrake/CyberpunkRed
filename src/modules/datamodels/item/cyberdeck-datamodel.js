import LOGGER from "../../utils/cpr-logger.js";
import CPRSystemDataModel from "../abstract.js";
import CommonSchema from "./mixins/common-schema.js";
import ContainerSchema from "../shared/container-schema.js";
import ElectronicSchema from "./mixins/electronic-schema.js";
import EquippableSchema from "./mixins/equippable-schema.js";
import InstallableSchema from "./mixins/installable-schema.js";
import PhysicalSchema from "./mixins/physical-schema.js";
import QualitySchema from "./mixins/quality-schema.js";
import UpgradableSchema from "./mixins/upgradable-schema.js";
import ValuableSchema from "./mixins/valuable-schema.js";

export default class CyberdeckDataModel extends CPRSystemDataModel.mixin(
  CommonSchema,
  ContainerSchema,
  ElectronicSchema,
  EquippableSchema,
  InstallableSchema,
  PhysicalSchema,
  QualitySchema,
  UpgradableSchema,
  ValuableSchema
) {
  static defineSchema() {
    LOGGER.trace("defineSchema | CyberdeckDataModel | called.");
    return this.mergeSchema(
      super.defineSchema({
        initialAllowedTypes: ["itemUpgrade", "program"],
        includeSlots: true,
        initialSlots: 7,
        initialSize: 1,
      }),
      {}
    );
  }

  // eslint-disable-next-line foundry-cpr/logger-after-function-definition
  get installedPrograms() {
    return this.parent.getInstalledItems("program");
  }

  // eslint-disable-next-line foundry-cpr/logger-after-function-definition
  get rezzedPrograms() {
    return this.parent
      .getInstalledItems("program")
      .filter((p) => p.system.isRezzed);
  }
}
