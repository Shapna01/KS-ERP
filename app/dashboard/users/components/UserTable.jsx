"use client";

const users = [
  {
    name: "Arjun",
    designation: "UI UX Designer",
    role: "Design Team",
    email: "arjun@kssmart.co",
    phone: "7896543210",
  },
  {
    name: "Lakshmi",
    designation: "Project Manager",
    role: "Management",
    email: "lakshmi@kssmart.co",
    phone: "7896543211",
  },
  {
    name: "Maya",
    designation: "Senior Designer",
    role: "Design Team",
    email: "maya@kssmart.co",
    phone: "7896543212",
  },
];

export default function UserTable() {
  return (
    <div className="bg-white rounded-2xl border overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr className="text-left text-sm text-gray-600">
            <th className="p-4">Name</th>
            <th className="p-4">
              Designation
            </th>
            <th className="p-4">Role</th>
            <th className="p-4">Work Mail</th>
            <th className="p-4">
              Contact Number
            </th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <tr
              key={index}
              className="border-t hover:bg-gray-50"
            >
              <td className="p-4 font-medium">
                {user.name}
              </td>

              <td className="p-4 text-gray-600">
                {user.designation}
              </td>

              <td className="p-4 text-gray-600">
                {user.role}
              </td>

              <td className="p-4 text-gray-600">
                {user.email}
              </td>

              <td className="p-4 text-gray-600">
                {user.phone}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}