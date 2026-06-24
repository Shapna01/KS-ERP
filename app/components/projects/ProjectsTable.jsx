export default function ProjectsTable({ projects }) {
  return (
    <div className="bg-white rounded-lg border overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-3 text-left">Project Name</th>
            <th className="p-3 text-left">Description</th>
            <th className="p-3 text-left">Code</th>
            <th className="p-3 text-left">Manager</th>
            <th className="p-3 text-left">Budget</th>
            <th className="p-3 text-left">Approval</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {projects?.map((project) => (
            <tr
              key={project.id}
              className="border-b hover:bg-gray-50"
            >
              <td className="p-3">
                {project.projectName}
              </td>

              <td className="p-3">
                {project.projectDescription}
              </td>

              <td className="p-3">
                {project.projectCode}
              </td>

              <td className="p-3">
                {project.projectManager}
              </td>

              <td className="p-3">
                ₹{project.estimatedBudget}
              </td>

              <td className="p-3">
                {project.approvalStatus}
              </td>

              <td className="p-3">
                {project.projectStatus}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {projects?.length === 0 && (
        <div className="p-6 text-center text-gray-500">
          No Projects Found
        </div>
      )}
    </div>
  );
}