import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "../../components/button/index.jsx";
import ChangePassword from "../../components/change-password/index.jsx";
import { useAuth } from "../../context/auth-context.jsx";
import { dateFormats } from "../../utils/misc.js";
import { useUpdateUser } from "../../utils/user.js";
import { Input, Select } from "../../components/input/index";
import { ErrorMessage } from "../../components/errors/index";
import "./styles.scss";
import UserDeleteModal from "../../components/user-delete-modal.jsx";

function ProfileScreen() {
  const { user } = useAuth();
  const { handleSubmit, register } = useForm();
  const { mutate, status, isPending, isError, error } = useUpdateUser();

  // TODO: make this generic?
  useEffect(() => {
    if (status === "pending") {
      toast.dismiss();
      toast.loading("Updating profile...");
    }
    if (status === "success") {
      toast.dismiss();
      toast("Profile updated successfully");
    }
  }, [status]);

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="layout profile">
      <form
        id="profile-form"
        onSubmit={handleSubmit(onSubmit)}
        className="profile__form"
      >
        <header className="profile__form__header">
          <h1>Profile</h1>
          <Button
            form="profile-form"
            type="submit"
            isLoading={isPending}
            className="profile__form__header__submit-save"
            size="lg"
          >
            Save
          </Button>
        </header>
        <section className="profile__form__account-info">
          <h2>Account information</h2>
          <Input
            id="name"
            type="text"
            label="Name"
            placeholder="Your name"
            defaultValue={user.name}
            {...register("name")}
          />
          <Input
            isDisabled
            id="email"
            type="email"
            label="Email"
            placeholder="Your email"
            defaultValue={user.email}
            {...register("email")}
          />
          <ChangePassword />
        </section>
        <section className="profile__form__customization">
          <h2>Customization</h2>
          <Select
            items={dateFormats}
            label="Date Format"
            placeholder="Select a date format"
            defaultSelectedKeys={["DD/MM/YYYY"]}
            {...register("dateFormat")}
          />
        </section>
        {isError && <ErrorMessage error={error} />}
        <section className="profile__form__danger-zone">
          <h2>Danger zone</h2>
          <UserDeleteModal />
        </section>
      </form>
    </div>
  );
}

export default ProfileScreen;
