import {
  CombinedStructure,
  PlanObject,
  StructureObject,
} from "../lib/interfaces";

export const calculateAvailableDates = (
  structures: StructureObject[],
  plans: PlanObject[],
  combinedStructures: CombinedStructure[],
  startDate: number,
  endDate: number
) => {
  const availableDatesWithInfo = new Map();

  for (const plan of plans) {
    for (const planStructure of plan.structures) {
      if (
        planStructure.duration.sellStart <= endDate &&
        planStructure.duration.sellEnd >= startDate &&
        plan.status === "done"
      ) {
        const structureId = planStructure.structureId;

        const structure = structures.find(
          (structure) => structure._id === structureId
        );

        if (structure) {
          const structureName = structure.name;

          if (!availableDatesWithInfo.has(structureName)) {
            availableDatesWithInfo.set(structureName, {
              location: {
                path: structure.location.path,
                address: structure.location.address,
                color: "red",
              },
              availableRanges: [
                {
                  startDate,
                  endDate,
                },
              ],
            });
          }

          const structureInfo = availableDatesWithInfo.get(structureName);

          for (const availableRange of structureInfo.availableRanges) {
            if (
              planStructure.duration.sellStart <= availableRange.endDate &&
              planStructure.duration.sellEnd >= availableRange.startDate
            ) {
              if (planStructure.duration.sellStart > availableRange.startDate)
                structureInfo.availableRanges.push({
                  startDate: availableRange.startDate,
                  endDate: planStructure.duration.sellStart,
                });

              if (planStructure.duration.sellEnd < availableRange.endDate)
                structureInfo.availableRanges.push({
                  startDate: planStructure.duration.sellEnd,
                  endDate: availableRange.endDate,
                });

              structureInfo.availableRanges.splice(
                structureInfo.availableRanges.indexOf(availableRange),
                1
              );
            }
          }
        }
      }
    }
  }

  const mainCombinedStructures = combinedStructures.filter(
    (x) =>
      x?.duration?.startDate <= startDate && x?.duration?.endDate >= endDate
  );
  for (const structure1 of mainCombinedStructures) {
    const structureName = structure1?.name;

    if (!availableDatesWithInfo.has(structureName)) {
      availableDatesWithInfo.set(structureName, {
        location: {
          path: structure1?.location.path,
          address: structure1?.location.address,
          color: "white",
        },
        availableRanges: [
          {
            startDate: startDate - 1,
            endDate: endDate,
          },
        ],
      });
    }
  }

  return availableDatesWithInfo;
};
