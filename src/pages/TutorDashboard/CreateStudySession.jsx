import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useUser from "../../hooks/useUser";
import { api } from "../../contexts/AuthProvider";

const CreateStudySession = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const inputdata = {
        ...data,
        tutorName: user?.name,
        tutorEmail: user?.email,
      };

      const formData = new FormData();

      formData.append("title", inputdata.title);
      formData.append("description", inputdata.description);
      formData.append("registrationStart", inputdata.registrationStart);
      formData.append("registrationEnd", inputdata.registrationEnd);
      formData.append("classStartDate", inputdata.classStartDate);
      formData.append("classStartTime", inputdata.classStartTime);
      formData.append("classEndTime", inputdata.classEndTime);
      formData.append("duration", inputdata.duration);
      formData.append("fee", inputdata.fee);
      formData.append("maxParticipants", inputdata.maxParticipants);
      formData.append("tutorName", inputdata.tutorName);
      formData.append("tutorEmail", inputdata.tutorEmail);

      if (data.image[0]) {
        formData.append("image", data.image[0]);
      }

      const response = await api.post("/api/tutor/add-session", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "The study session has been successfully created!",
        });
        reset();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Something went wrong!",
      });
      console.error("Error creating study session:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto bg-white p-8">
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
        Create Study Session
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div>
          <label
            htmlFor="title"
            className="block text-lg font-medium text-gray-700"
          >
            Session Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title", { required: "Session title is required" })}
            className={`mt-2 input input-bordered w-full ${
              errors.title ? "border-red-500" : ""
            }`}
            placeholder="Enter session title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="tutorName"
            className="block text-lg font-medium text-gray-700"
          >
            Tutor Name
          </label>
          <input
            type="text"
            id="tutorName"
            defaultValue={user?.name}
            readOnly
            className="mt-2 input input-bordered w-full bg-gray-200 cursor-not-allowed"
          />
        </div>

        <div>
          <label
            htmlFor="tutorEmail"
            className="block text-lg font-medium text-gray-700"
          >
            Tutor Email
          </label>
          <input
            type="email"
            id="tutorEmail"
            defaultValue={user?.email}
            readOnly
            className="mt-2 input input-bordered w-full bg-gray-200 cursor-not-allowed"
          />
        </div>

        <div className="md:col-span-2 lg:col-span-3">
          <label
            htmlFor="description"
            className="block text-lg font-medium text-gray-700"
          >
            Session Description
          </label>
          <textarea
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
            className={`mt-2 textarea textarea-bordered w-full ${
              errors.description ? "border-red-500" : ""
            }`}
            rows="3"
            placeholder="Enter session details"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="image"
            className="block text-lg font-medium text-gray-700"
          >
            Session Image
          </label>
          <input
            type="file"
            {...register("image", { required: "Session image is required" })}
            className="mt-2 file-input file-input-bordered w-full"
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="registrationStart"
            className="block text-lg font-medium text-gray-700"
          >
            Registration Start Date
          </label>
          <input
            type="date"
            id="registrationStart"
            {...register("registrationStart", {
              required: "Start date is required",
            })}
            className={`mt-2 input input-bordered w-full ${
              errors.registrationStart ? "border-red-500" : ""
            }`}
          />
          {errors.registrationStart && (
            <p className="text-red-500 text-sm mt-1">
              {errors.registrationStart.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="registrationEnd"
            className="block text-lg font-medium text-gray-700"
          >
            Registration End Date
          </label>
          <input
            type="date"
            id="registrationEnd"
            {...register("registrationEnd", {
              required: "End date is required",
            })}
            className={`mt-2 input input-bordered w-full ${
              errors.registrationEnd ? "border-red-500" : ""
            }`}
          />
          {errors.registrationEnd && (
            <p className="text-red-500 text-sm mt-1">
              {errors.registrationEnd.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="classStartDate"
            className="block text-lg font-medium text-gray-700"
          >
            Class Start Date
          </label>
          <input
            type="date"
            id="classStartDate"
            {...register("classStartDate", {
              required: "Start date is required",
            })}
            className={`mt-2 input input-bordered w-full ${
              errors.classStartDate ? "border-red-500" : ""
            }`}
          />
          {errors.classStartDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.classStartDate.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="classStartTime"
            className="block text-lg font-medium text-gray-700"
          >
            Class Start Time
          </label>
          <input
            type="time"
            id="classStartTime"
            {...register("classStartTime", {
              required: "Start time is required",
            })}
            className={`mt-2 input input-bordered w-full ${
              errors.classStartTime ? "border-red-500" : ""
            }`}
          />
          {errors.classStartTime && (
            <p className="text-red-500 text-sm mt-1">
              {errors.classStartTime.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="classEndTime"
            className="block text-lg font-medium text-gray-700"
          >
            Class End Time
          </label>
          <input
            type="time"
            id="classEndTime"
            {...register("classEndTime", { required: "End time is required" })}
            className={`mt-2 input input-bordered w-full ${
              errors.classEndTime ? "border-red-500" : ""
            }`}
          />
          {errors.classEndTime && (
            <p className="text-red-500 text-sm mt-1">
              {errors.classEndTime.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="duration"
            className="block text-lg font-medium text-gray-700"
          >
            Session Duration (hours)
          </label>
          <input
            type="number"
            id="duration"
            {...register("duration", {
              required: "Duration is required",
              min: 1,
            })}
            className={`mt-2 input input-bordered w-full ${
              errors.duration ? "border-red-500" : ""
            }`}
            placeholder="2"
          />
          {errors.duration && (
            <p className="text-red-500 text-sm mt-1">
              {errors.duration.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="fee"
            className="block text-lg font-medium text-gray-700"
          >
            Registration Fee ($)
          </label>
          <input
            type="number"
            id="fee"
            defaultValue={0}
            readOnly
            className={`mt-2 input input-bordered w-full`}
            placeholder="50"
          />
          {errors.fee && (
            <p className="text-red-500 text-sm mt-1">{errors.fee.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="maxParticipants"
            className="block text-lg font-medium text-gray-700"
          >
            Max Participants
          </label>
          <input
            type="number"
            id="maxParticipants"
            {...register("maxParticipants", {
              required: "Max participants is required",
              min: 1,
            })}
            className={`mt-2 input input-bordered w-full ${
              errors.maxParticipants ? "border-red-500" : ""
            }`}
            placeholder="20"
          />
          {errors.maxParticipants && (
            <p className="text-red-500 text-sm mt-1">
              {errors.maxParticipants.message}
            </p>
          )}
        </div>
        <div className="lg:col-span-3 text-center">
          <button
            type="submit"
            className={`btn btn-primary px-6 py-2 text-lg rounded-lg ${
              loading ? "btn-disabled cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <span className="loading loading-spinner loading-md mr-2"></span>
                Uploading...
              </div>
            ) : (
              "Create Session"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateStudySession;
