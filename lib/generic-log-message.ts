import { auditlog, ACTIONS, ENTITY_TYPE } from "@prisma/client";

export const generateLogMessage = (log: auditlog) => {
  const { action, entityType, entityTitle } = log;

  switch (action) {
    case ACTIONS.CREATE:
      return `Created ${entityType.toLowerCase()} "${entityTitle}"`;
    case ACTIONS.UPDATE:
      return `Updated ${entityType.toLowerCase()} "${entityTitle}"`;
    case ACTIONS.DELETE:
      return `Deleted ${entityType.toLowerCase()} "${entityTitle}"`;
    default:
      return `Unknown Action`;
  }
};
