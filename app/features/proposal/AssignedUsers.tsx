import SelectInput from "@/app/components/inputs/SelectInput";
import { AddProposalForm } from "@/app/lib/interfaces";
import React, { useState } from "react";
import {
  Control,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
} from "react-hook-form";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";

type Props = {
  usersField: Record<"id", string>[];
  control: Control<AddProposalForm, any>;
  appendUser: UseFieldArrayAppend<AddProposalForm, "assignedUsers">;
  removeUser: UseFieldArrayRemove;
  usersOptions: {
    id: string;
    name: string;
  }[];
  err: string;
};
const AssignedUsers = (props: Props) => {
  const { usersField, control, appendUser, removeUser, usersOptions, err } =
    props;

  const [flag, setFlag] = useState(true);

  const handleAddUser = (fieldIndex: number) => {
    const selectedUserId = usersOptions[fieldIndex]?.id;
    if (selectedUserId) {
      appendUser({ id: selectedUserId });
    }
  };
  return (
    <div className="backdrop-blur bg-white/30 border-[1px] dark:text-black border-gray-400 col-span-2 rounded-md mb-2 pl-2 pr-4">
      {usersField.map((item: any, fieldIndex: number) => {
        return (
          <div
            className="flex items-center gap-2 justify-center"
            key={item._id}
          >
            <div className="absolute right-0 top-0 min-h-[10px] overflow-hidden w-4 rounded-md bg-primary text-white flex justify-center items-center font-bold  hover:scale-125 cursor-pointer transition-all">
              {fieldIndex + 1}
            </div>
            <div className="flex">
              <SelectInput
                control={control}
                name={`assignedUsers[${fieldIndex}].id`} // Use correct name for the input
                label={"کاربر"}
                options={usersOptions}
                errors={err}
              />
              <AiFillMinusCircle
                className={`cursor-pointer text-2xl hover:text-red-700 transition-all`}
                onClick={() => removeUser(fieldIndex)}
              />
              <AiFillPlusCircle
                className="cursor-pointer text-2xl hover:text-green-700 transition-all"
                onClick={() => handleAddUser(fieldIndex)}
              />
            </div>
          </div>
        );
      })}
      {flag && (
        <AiFillPlusCircle
          className="cursor-pointer text-2xl hover:text-green-700 transition-all"
          onClick={() => {
            appendUser("");
            setFlag(false);
          }}
        />
      )}
    </div>
  );
};

export default AssignedUsers;
