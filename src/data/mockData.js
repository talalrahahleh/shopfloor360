export const MACHINES = [
  { id: 'M001', name: 'Welding Station',    line: 'A', status: 'Running', output: 142, target: 150, uptime: 94.2, efficiency: 88 },
  { id: 'M002', name: 'Assembly Robot B1',  line: 'A', status: 'Running', output: 98,  target: 100, uptime: 98.1, efficiency: 96 },
  { id: 'M003', name: 'Quality Scanner',    line: 'A', status: 'Fault',   output: 0,   target: 120, uptime: 67.3, efficiency: 0  },
  { id: 'M004', name: 'Hydraulic Press',    line: 'B', status: 'Idle',    output: 0,   target: 80,  uptime: 88.5, efficiency: 72 },
  { id: 'M005', name: 'Main Conveyor',      line: 'B', status: 'Running', output: 203, target: 200, uptime: 99.7, efficiency: 99 },
  { id: 'M006', name: 'Paint Booth',        line: 'B', status: 'Running', output: 55,  target: 60,  uptime: 91.8, efficiency: 84 },
  { id: 'M007', name: 'CNC Lathe G1',       line: 'C', status: 'Idle',    output: 0,   target: 40,  uptime: 72.4, efficiency: 68 },
  { id: 'M008', name: 'Inspection Unit',    line: 'C', status: 'Running', output: 188, target: 190, uptime: 96.3, efficiency: 93 },
];

export const INCIDENTS = [
  { id: 'INC-001', machine: 'M003', machineName: 'Quality Scanner',   line: 'A', severity: 'Critical', category: 'Sensor',      description: 'Vision system calibration failure — false rejection rate above 40%.', status: 'Open',        assignee: 'T. Müller',    created: '2025-05-04T08:12:00' },
  { id: 'INC-002', machine: 'M001', machineName: 'Welding Station',   line: 'A', severity: 'High',     category: 'Mechanical',  description: 'Torch tip wear detected. Weld penetration depth inconsistent.',      status: 'In Progress', assignee: 'K. Schmidt',   created: '2025-05-04T09:45:00' },
  { id: 'INC-003', machine: 'M007', machineName: 'CNC Lathe G1',      line: 'C', severity: 'High',     category: 'Mechanical',  description: 'Spindle vibration exceeds spec. Auto-stop triggered at 09:31.',     status: 'In Progress', assignee: 'L. Fischer',   created: '2025-05-04T09:31:00' },
  { id: 'INC-004', machine: 'M006', machineName: 'Paint Booth',       line: 'B', severity: 'Medium',   category: 'Electrical',  description: 'Exhaust fan #2 intermittently tripping breaker.',                   status: 'Open',        assignee: 'Unassigned',   created: '2025-05-03T14:20:00' },
  { id: 'INC-005', machine: 'M002', machineName: 'Assembly Robot B1', line: 'A', severity: 'Medium',   category: 'Software',    description: 'PLC programme version mismatch after shift changeover.',            status: 'Resolved',    assignee: 'T. Müller',    created: '2025-05-03T06:55:00' },
  { id: 'INC-006', machine: 'M004', machineName: 'Hydraulic Press',   line: 'B', severity: 'Low',      category: 'Mechanical',  description: 'Scheduled maintenance — oil change and seal inspection.',           status: 'In Progress', assignee: 'R. Weber',     created: '2025-05-02T10:00:00' },
  { id: 'INC-007', machine: 'M005', machineName: 'Main Conveyor',     line: 'B', severity: 'Low',      category: 'Sensor',      description: 'Belt speed sensor drift — calibration scheduled for next shift.',   status: 'Open',        assignee: 'K. Schmidt',   created: '2025-05-02T16:30:00' },
  { id: 'INC-008', machine: 'M008', machineName: 'Inspection Unit',   line: 'C', severity: 'Medium',   category: 'Software',    description: 'Firmware update required — v2.4.1 compatibility issue with MES.',  status: 'Resolved',    assignee: 'L. Fischer',   created: '2025-05-01T11:15:00' },
  { id: 'INC-009', machine: 'M001', machineName: 'Welding Station',   line: 'A', severity: 'Critical', category: 'Electrical',  description: 'Earth leakage trip on secondary power circuit — plant safety hold.',status: 'Resolved',    assignee: 'R. Weber',     created: '2025-04-30T07:02:00' },
  { id: 'INC-010', machine: 'M003', machineName: 'Quality Scanner',   line: 'A', severity: 'High',     category: 'Sensor',      description: 'Laser head occlusion — cleaning and re-zero procedure required.',   status: 'Resolved',    assignee: 'T. Müller',    created: '2025-04-29T13:44:00' },
];

export const OEE_WEEKLY = [
  { week: 'W18', availability: 91.2, performance: 87.4, quality: 96.1, oee: 76.6 },
  { week: 'W19', availability: 88.5, performance: 84.2, quality: 95.8, oee: 71.4 },
  { week: 'W20', availability: 93.7, performance: 89.1, quality: 97.3, oee: 81.3 },
  { week: 'W21', availability: 90.1, performance: 86.5, quality: 96.7, oee: 75.2 },
  { week: 'W22', availability: 94.4, performance: 91.2, quality: 98.0, oee: 84.3 },
  { week: 'W23', availability: 89.8, performance: 85.7, quality: 95.4, oee: 73.5 },
  { week: 'W24', availability: 92.3, performance: 88.6, quality: 97.1, oee: 79.4 },
  { week: 'W25', availability: 87.6, performance: 82.9, quality: 94.8, oee: 68.8 },
];

export const OEE_BY_MACHINE = [
  { machine: 'M001', name: 'Welding',    oee: 82.6, availability: 94.2, performance: 89.1, quality: 98.2 },
  { machine: 'M002', name: 'Assembly',   oee: 91.4, availability: 98.1, performance: 93.8, quality: 99.3 },
  { machine: 'M003', name: 'Scanner',    oee: 38.2, availability: 67.3, performance: 58.4, quality: 97.2 },
  { machine: 'M004', name: 'Press',      oee: 69.8, availability: 88.5, performance: 79.2, quality: 99.5 },
  { machine: 'M005', name: 'Conveyor',   oee: 94.1, availability: 99.7, performance: 95.2, quality: 99.2 },
  { machine: 'M006', name: 'Paint',      oee: 74.3, availability: 91.8, performance: 81.4, quality: 99.3 },
  { machine: 'M007', name: 'CNC Lathe',  oee: 58.7, availability: 72.4, performance: 81.9, quality: 98.8 },
  { machine: 'M008', name: 'Inspection', oee: 88.3, availability: 96.3, performance: 91.8, quality: 99.8 },
];

export const USERS = {
  operator: { password: 'Talal2003', role: 'Operator', name: 'Anna Bauer',    line: 'A' },
  manager:  { password: 'Talal2003', role: 'Manager',  name: 'Hans Richter',  line: null },
};
