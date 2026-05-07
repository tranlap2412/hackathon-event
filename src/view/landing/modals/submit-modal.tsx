/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  DialogRoot,
  DialogBackdrop,
  DialogPositioner,
  DialogContent,
  DialogCloseTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  RadioGroupRoot,
  RadioGroupLabel,
  RadioGroupItem,
  RadioItemText,
  RadioItemHiddenInput,
  RadioItemControl,
} from "@/components/ui/radio-group";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";

interface SubmitModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface SubmitFormValues {
  teamName: string;
  phone: string;
  leader: string;
  email: string;
  track: string;
  selfReview: string;
  github: string;
  pitchdeck?: string;
  demo?: string;
  others?: string;
  video?: string;
}

export function SubmitModal({ open, onOpenChange }: SubmitModalProps) {
  const [step, setStep] = useState(1);
  const { i18n } = useLingui();

  // Yup schemas
  const schemaStep1 = yup.object({
    teamName: yup.string().required(i18n._(msg`Please enter team name`)),
    phone: yup.string().required(i18n._(msg`Please enter phone number`)),
    leader: yup.string().required(i18n._(msg`Please enter leader name`)),
    email: yup
      .string()
      .email(i18n._(msg`Invalid email`))
      .required(i18n._(msg`Please enter email`)),
  });

  const schemaStep2 = yup.object({
    track: yup.string().required(i18n._(msg`Please select a track`)),
    selfReview: yup.string().url(i18n._(msg`Invalid URL`)),
    github: yup
      .string()
      .url(i18n._(msg`Invalid URL`))
      .required(i18n._(msg`Github is required`)),
    pitchdeck: yup
      .string()
      .url(i18n._(msg`Invalid URL`))
      .optional(),
    demo: yup
      .string()
      .url(i18n._(msg`Invalid URL`))
      .optional(),
    others: yup
      .string()
      .url(i18n._(msg`Invalid URL`))
      .optional(),
    video: yup
      .string()
      .url(i18n._(msg`Invalid URL`))
      .optional(),
  });

  const form = useForm<SubmitFormValues>({
    resolver: yupResolver(step === 1 ? schemaStep1 : (schemaStep2 as any)),
    defaultValues: {
      teamName: "",
      phone: "",
      leader: "",
      email: "",
      track: "",
      selfReview: "",
      github: "",
      pitchdeck: "",
      demo: "",
      others: "",
      video: "",
    },
    mode: "onBlur",
  });

  const { control, handleSubmit } = form;

  const nextStep = async () => {
    const valid = await form.trigger(["teamName", "phone", "leader", "email"]);
    if (valid) setStep(2);
  };

  const onSubmit = (data: any) => {
    console.log("Submit form:", data);
    onOpenChange(false);
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
        <DialogContent className="sm:max-w-4xl w-full h-[80vh] flex flex-col">
          <DialogCloseTrigger />
          <DialogTitle className="text-2xl font-extrabold sm:text-3xl lg:text-4xl text-primary">
            {i18n._(msg`Submit Your Project`)}
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            {step === 1
              ? i18n._(
                  msg`(Fill exactly as registration form, if already registered)`
                )
              : i18n._(
                  msg`Demo only. This form is not sent to a server.`
                )}
          </DialogDescription>

          {/* Scrollable form */}
          <div className="z-10 flex-1 pr-2 overflow-y-auto custom-scroll">
            <form
              id="submit-form"
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
                    {i18n._(msg`Project Submission`)}
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
                        placeholder={i18n._(msg`Enter team name`)}
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
                        placeholder={i18n._(msg`Enter phone number`)}
                        {...field}
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="leader"
                    render={({ field, fieldState }) => (
                      <Input
                        label={i18n._(msg`Leader full name`)}
                        placeholder={i18n._(msg`Enter leader full name`)}
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
                        placeholder={i18n._(msg`Enter email`)}
                        {...field}
                        error={fieldState.error?.message}
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
                    name="selfReview"
                    render={({ field, fieldState }) => (
                      <Input
                        label={i18n._(msg`Team self-assessment`)}
                        placeholder={i18n._(
                          msg`Enter Google Docs link for self-assessment`
                        )}
                        {...field}
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="github"
                    render={({ field, fieldState }) => (
                      <Input
                        label={i18n._(msg`Github URL`)}
                        placeholder="https://github.com/..."
                        {...field}
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="pitchdeck"
                    render={({ field, fieldState }) => (
                      <Input
                        label={i18n._(msg`Pitchdeck`)}
                        placeholder="https://docs.google.com/..."
                        {...field}
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="demo"
                    render={({ field, fieldState }) => (
                      <Input
                        label={i18n._(msg`Demo URL`)}
                        placeholder={i18n._(msg`Enter demo link`)}
                        {...field}
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="others"
                    render={({ field, fieldState }) => (
                      <Input
                        label={i18n._(msg`Other documents`)}
                        placeholder="https://..."
                        {...field}
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="video"
                    render={({ field, fieldState }) => (
                      <Input
                        label={i18n._(msg`Video demo (YouTube)`)}
                        placeholder="https://youtube.com/..."
                        {...field}
                        error={fieldState.error?.message}
                      />
                    )}
                  />

                  {/* Track chọn (radio) */}
                  <Controller
                    control={control}
                    name="track"
                    render={({ field, fieldState }) => (
                      <RadioGroupRoot
                        value={field.value}
                        onValueChange={(d) => field.onChange(d.value)}
                      >
                        <RadioGroupLabel className="text-base font-semibold sm:text-lg">
                          {i18n._(msg`Select Track`)}
                        </RadioGroupLabel>
                        {tracks.map((t, i) => (
                          <RadioGroupItem key={i} value={t}>
                            <RadioItemHiddenInput />
                            <RadioItemControl />
                            <RadioItemText>{t}</RadioItemText>
                          </RadioGroupItem>
                        ))}
                        {fieldState.error && (
                          <p className="text-sm text-red-500">
                            {fieldState.error.message}
                          </p>
                        )}
                      </RadioGroupRoot>
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
                <Button type="submit" form="submit-form">
                  {i18n._(msg`Submit`)}
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
