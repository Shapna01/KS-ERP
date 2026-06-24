"use client";

import { useState } from "react";

export default function AssignTeamForm({ project }) {
  const [availableUsers, setAvailableUsers] = useState([
    "Design Department",
    "Finance Department",
    "Audit Team",
    "Vikram",
    "Ruthran",
  ]);

  const [chosenUsers, setChosenUsers] = useState([]);

  const [selectedAvailable, setSelectedAvailable] = useState([]);
  const [selectedChosen, setSelectedChosen] = useState([]);

  const addSelected = () => {
    const users = availableUsers.filter((u) =>
      selectedAvailable.includes(u)
    );

    setChosenUsers([...chosenUsers, ...users]);

    setAvailableUsers(
      availableUsers.filter(
        (u) => !selectedAvailable.includes(u)
      )
    );

    setSelectedAvailable([]);
  };

  const addAll = () => {
    setChosenUsers([...chosenUsers, ...availableUsers]);
    setAvailableUsers([]);
    setSelectedAvailable([]);
  };

  const removeSelected = () => {
    const users = chosenUsers.filter((u) =>
      selectedChosen.includes(u)
    );

    setAvailableUsers([...availableUsers, ...users]);

    setChosenUsers(
      chosenUsers.filter(
        (u) => !selectedChosen.includes(u)
      )
    );

    setSelectedChosen([]);
  };

  const removeAll = () => {
    setAvailableUsers([...availableUsers, ...chosenUsers]);
    setChosenUsers([]);
    setSelectedChosen([]);
  };
  const handleDone = async () => {
  try {
    const response = await fetch(
      `/api/projects/${project.id}/assign-team`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectManager: "Rohan Ramaswamy",
          teamMembers: chosenUsers,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      window.location.href = `/dashboard/projects/${project.id}/overview`;
    } else {
      alert(data.error);
    }
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="pt-[100px] px-10 pb-10 bg-[#F7F7FA] min-h-screen">
      <div className="max-w-5xl mx-auto">

        <div className="text-sm mb-5">
          <span className="text-[#7A008C]">Projects</span>
          <span className="mx-2">{">"}</span>
          <span>{project.projectName}</span>
        </div>

        <h1 className="text-4xl font-semibold">
          {project.projectName}
        </h1>

        <p className="text-gray-500 mt-2 mb-8">
          {project.projectDescription}
        </p>

        <div className="grid grid-cols-3 max-w-3xl mb-8">
          <div className="bg-[#F4D8F8] text-[#7A008C] text-center py-3 rounded-l-md font-medium">
            Submit Project
          </div>

          <div className="bg-[#F4D8F8] text-[#7A008C] text-center py-3 font-medium">
            Approved
          </div>

          <div className="bg-[#F4D8F8] text-[#7A008C] text-center py-3 rounded-r-md font-medium">
            Assign Team
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden">
          <div className="p-6 space-y-10">

            <div className="mb-8">
              <label className="block text-sm text-gray-500 mb-2">
                Assign Project Manager
              </label>

              <select
className="
w-full
h-14
px-5
rounded-2xl
border border-gray-200
bg-gray-50
text-black
outline-none
focus:ring-2
focus:ring-[#7A008C]
"
>
                <option>Rohan Ramaswamy</option>
              </select>
            </div>

            <h3 className=" text-gray-700 font-semibold mb-2">
              Add Team
            </h3>

            <p className="text-sm text-gray-500 mb-6">
              Assign users to this project.
            </p>

          <div className="grid grid-cols-[1fr_140px_1fr] gap-8 items-center">

              <div className="
                bg-gray-50
                border border-gray-100
                rounded-3xl
                p-6
                h-[450px]
                overflow-y-auto
                shadow-sm
                ">
                <h4 className="font-medium text-gray-700 text-lg mb-5">
                  Available Users
                </h4>

                <div className="space-y-3 text-gray-700">
                  {availableUsers.map((user) => (
                    <label
                      key={user}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        checked={selectedAvailable.includes(user)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedAvailable([
                              ...selectedAvailable,
                              user,
                            ]);
                          } else {
                            setSelectedAvailable(
                              selectedAvailable.filter(
                                (u) => u !== user
                              )
                            );
                          }
                        }}
                      />
                      {user}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-center gap-3">
                <button
                  onClick={addSelected}
                  className="
bg-[#7A008C]
text-white
rounded-2xl
py-3
font-medium
shadow-md
hover:bg-purple-900
transition
"
                >
                  Add →
                </button>

                <button
                  onClick={addAll}
                  className="
bg-purple-100
text-[#7A008C]
rounded-2xl
py-3
font-medium
"
                >
                  Add All →
                </button>

                <button
                  onClick={removeSelected}
                  className="
bg-red-50
text-red-600
rounded-2xl
py-3
font-medium
"
                >
                  ← Remove
                </button>

                <button
                  onClick={removeAll}
                  className="
bg-red-100
text-red-700
rounded-2xl
py-3
font-medium
"
                >
                  ← Remove All
                </button>
              </div>

              <div className="border rounded-lg p-4 h-[400px] overflow-auto">
                <h4 className="text-gray-700 font-medium mb-4">
                  Chosen Users
                </h4>

                <div className="space-y-3 text-gray-700">
                  {chosenUsers.map((user) => (
                    <label
                      key={user}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        checked={selectedChosen.includes(user)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedChosen([
                              ...selectedChosen,
                              user,
                            ]);
                          } else {
                            setSelectedChosen(
                              selectedChosen.filter(
                                (u) => u !== user
                              )
                            );
                          }
                        }}
                      />
                      {user}
                    </label>
                  ))}
                </div>
              </div>

            </div>
          </div>

          <div className="
border-t
border-gray-100
bg-gray-50
px-10
py-6
flex
justify-end
gap-5
">
            <button
className="
px-8 py-3
rounded-2xl
border border-gray-300
text-gray-600
hover:bg-gray-100
"
>
Cancel
</button>
          

            <button
onClick={handleDone}
className="
px-10 py-3
rounded-2xl
bg-gradient-to-r
from-[#7A008C]
to-purple-700
text-white
font-semibold
shadow-lg
hover:scale-105
transition-all
"
>
Done ✓
</button>
          </div>
        </div>
      </div>
    </div>
  );
}