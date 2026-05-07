/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogPositioner,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CheckboxRoot,
  CheckboxLabel,
  CheckboxControl,
  CheckboxHiddenInput,
} from "@/components/ui/checkbox";

import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Trash } from "lucide-react";

// 🔹 Types
interface Member {
  name: string;
  studentCode: string;
  phone: string;
  email: string;
}

interface RegisterFormValues {
  teamName: string;
  university: string;
  faculty: string;
  teacher?: string;
  leaderName: string;
  studentCode: string;
  phone: string;
  email: string;
  track: string[];
  members: Member[];
}

export function RegisterModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [step, setStep] = useState(1);
  const { i18n } = useLingui();

  // Yup schemas với i18n
  const schemaStep1 = yup.object({
    teamName: yup.string().required(i18n._(msg`Please enter team name`)),
    university: yup.string().required(i18n._(msg`Please enter university`)),
    faculty: yup.string().required(i18n._(msg`Please enter faculty/major`)),
    teacher: yup.string().optional(),
  });

  const schemaStep2 = yup.object({
    leaderName: yup.string().required(i18n._(msg`Please enter leader name`)),
    studentCode: yup.string().required(i18n._(msg`Please enter student code`)),
    phone: yup.string().required(i18n._(msg`Please enter phone number`)),
    email: yup
      .string()
      .email(i18n._(msg`Invalid email`))
      .required(i18n._(msg`Please enter email`)),
    track: yup
      .array()
      .of(yup.string())
      .min(1, i18n._(msg`Please select at least one track`)),

    members: yup
      .array()
      .of(
        yup.object({
          name: yup.string().required(i18n._(msg`Please enter member name`)),
          studentCode: yup
            .string()
            .required(i18n._(msg`Please enter student code`)),
          phone: yup.string().required(i18n._(msg`Please enter phone number`)),
          email: yup
            .string()
            .email(i18n._(msg`Invalid email`))
            .required(i18n._(msg`Please enter email`)),
        })
      )
      .test(
        "unique-studentCode",
        i18n._(msg`Student ID must be unique`),
        (members) => {
          if (!members) return true;
          const codes = members.map((m) => m.studentCode);
          return codes.length === new Set(codes).size;
        }
      )
      // 🔹 validate không trùng email
      .test("unique-email", i18n._(msg`Email must be unique`), (members) => {
        if (!members) return true;
        const emails = members.map((m) => m.email);
        return emails.length === new Set(emails).size;
      }),
  });

  const form = useForm<RegisterFormValues>({
    resolver: yupResolver(step === 1 ? schemaStep1 : (schemaStep2 as any)),
    defaultValues: {
      teamName: "",
      university: "",
      faculty: "",
      teacher: "",
      leaderName: "",
      studentCode: "",
      phone: "",
      email: "",
      track: [],
      members: [],
    },
    mode: "onBlur",
  });

  const { control, handleSubmit } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "members",
  });

  const onSubmit = (data: any) => {
    console.log("Form:", data);
    onOpenChange(false);
  };

  const nextStep = async () => {
    const valid = await form.trigger([
      "teamName",
      "university",
      "faculty",
      "teacher",
    ]);
    if (valid) setStep(2);
  };

  const tracks = [
    i18n._(msg`Origin Tracing DApp`),
    i18n._(msg`DEX & Bridge`),
    i18n._(msg`AI & IoT`),
    i18n._(msg`Consensus Algorithm`),
    i18n._(msg`Identity & Tokenization`),
  ];

  return (
    <DialogRoot open={open} onOpenChange={(d) => onOpenChange(d.open)}>
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent className="sm:max-w-5xl w-full h-[80vh] flex flex-col">
          <DialogCloseTrigger />
          <DialogTitle className="text-2xl font-extrabold sm:text-3xl lg:text-4xl text-primary">
            {i18n._(msg`Register to Join`)}
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            {i18n._(
              msg`Preview only. This form is not sent to a server.`
            )}
          </DialogDescription>

          {/* Scrollable form */}
          <div className="z-10 flex-1 pr-2 overflow-y-auto custom-scroll">
            <form
              id="register-form"
              onSubmit={handleSubmit(onSubmit)}
              className="py-4 space-y-5"
            >
              {/* Step indicator */}
              <div className="flex items-center justify-center gap-3 mb-4 sm:mb-8 sm:gap-8">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-bold ${
                      step === 1 ? "bg-primary text-white" : "bg-primary/20"
                    }`}
                  >
                    1
                  </div>
                  <span className="mt-2 text-sm font-semibold text-center">
                    {i18n._(msg`Team Info`)}
                  </span>
                </div>
                <div className="h-0.5 w-12 bg-primary/50" />
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-bold ${
                      step === 2 ? "bg-primary text-white" : "bg-primary/20"
                    }`}
                  >
                    2
                  </div>
                  <span className="mt-2 text-sm font-semibold text-center">
                    {i18n._(msg`Contact Info`)}
                  </span>
                </div>
              </div>

              {/* Step 1 */}
              {step === 1 && (
                <>
                  <Controller
                    control={control}
                    name="teamName"
                    render={({ field, fieldState }) => (
                      <Input
                        label={i18n._(msg`Team name`)}
                        {...field}
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="university"
                    render={({ field, fieldState }) => (
                      <Input
                        label={i18n._(msg`University`)}
                        {...field}
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="faculty"
                    render={({ field, fieldState }) => (
                      <Input
                        label={i18n._(msg`Faculty / Major`)}
                        {...field}
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="teacher"
                    render={({ field }) => (
                      <Input
                        label={i18n._(msg`Mentor teacher (optional)`)}
                        {...field}
                      />
                    )}
                  />
                </>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <>
                  <Controller
                    control={control}
                    name="leaderName"
                    render={({ field, fieldState }) => (
                      <Input
                        label={i18n._(msg`Leader full name`)}
                        {...field}
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="studentCode"
                    render={({ field, fieldState }) => (
                      <Input
                        label={i18n._(msg`Student ID`)}
                        {...field}
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="phone"
                    render={({ field, fieldState }) => (
                      <Input
                        label={i18n._(msg`Phone number`)}
                        {...field}
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="email"
                    render={({ field, fieldState }) => (
                      <Input
                        label="Email"
                        {...field}
                        error={fieldState.error?.message}
                      />
                    )}
                  />

                  {/* Other members */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold">
                      {i18n._(msg`Other Members`)}
                    </h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      {fields.map((member, i) => (
                        <div
                          key={member.id}
                          className="p-3 sm:p-5 pb-3 space-y-3 border rounded-lg !border-primary/40"
                        >
                          <Controller
                            control={control}
                            name={`members.${i}.name`}
                            render={({ field, fieldState }) => (
                              <Input
                                label={`${i18n._(msg`Member`)} ${
                                  i + 1
                                } - ${i18n._(msg`Full name`)}`}
                                {...field}
                                error={fieldState.error?.message}
                              />
                            )}
                          />
                          <Controller
                            control={control}
                            name={`members.${i}.studentCode`}
                            render={({ field, fieldState }) => (
                              <Input
                                label={i18n._(msg`Student ID`)}
                                {...field}
                                error={fieldState.error?.message}
                              />
                            )}
                          />
                          <Controller
                            control={control}
                            name={`members.${i}.phone`}
                            render={({ field, fieldState }) => (
                              <Input
                                label={i18n._(msg`Phone number`)}
                                {...field}
                                error={fieldState.error?.message}
                              />
                            )}
                          />
                          <Controller
                            control={control}
                            name={`members.${i}.email`}
                            render={({ field, fieldState }) => (
                              <Input
                                label="Email"
                                {...field}
                                error={fieldState.error?.message}
                              />
                            )}
                          />
                          {/* Remove button */}
                          <div className="flex justify-end">
                            <Button
                              type="button"
                              variant="destructive"
                              shape="flat"
                              onClick={() => remove(i)}
                              className="px-5 text-sm"
                            >
                              <Trash className="size-4 me-2.5" />{" "}
                              {i18n._(msg`Remove`)}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    {form.formState?.errors?.members?.root?.message && (
                      <p className="text-sm text-red-500">
                        {form.formState?.errors.members?.root?.message.toString()}
                      </p>
                    )}
                    <Button
                      type="button"
                      onClick={() =>
                        append({
                          name: "",
                          studentCode: "",
                          phone: "",
                          email: "",
                        })
                      }
                    >
                      + {i18n._(msg`Add member`)}
                    </Button>
                  </div>

                  {/* Track chọn */}
                  <Controller
                    control={control}
                    name="track"
                    render={({ field, fieldState }) => (
                      <div className="space-y-3">
                        <h4 className="font-semibold sm:text-lg">
                          {i18n._(msg`Select Tracks`)}
                        </h4>
                        <div className="flex flex-col gap-3">
                          {tracks.map((t, i) => (
                            <CheckboxRoot
                              key={i}
                              checked={field.value?.includes(t) || false}
                              onCheckedChange={(c) => {
                                if (c.checked) {
                                  field.onChange([...field.value, t]);
                                } else {
                                  field.onChange(
                                    field.value.filter(
                                      (val: string) => val !== t
                                    )
                                  );
                                }
                              }}
                            >
                              <CheckboxHiddenInput />
                              <CheckboxControl />
                              <CheckboxLabel>{t}</CheckboxLabel>
                            </CheckboxRoot>
                          ))}
                        </div>
                        {fieldState.error && (
                          <p className="text-sm text-red-500">
                            {fieldState.error.message as string}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </>
              )}
            </form>
          </div>

          {/* Fixed footer */}
          <div className="flex justify-between p-4 border-t border-border bg-background">
            {step === 2 ? (
              <>
                <Button type="button" onClick={() => setStep(1)}>
                  {i18n._(msg`Back`)}
                </Button>
                <Button type="submit" form="register-form">
                  {i18n._(msg`Register`)}
                </Button>
              </>
            ) : (
              <Button type="button" onClick={nextStep} className="ml-auto">
                {i18n._(msg`Next`)}
              </Button>
            )}
          </div>
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  );
}
