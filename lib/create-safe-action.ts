import z from 'zod'

export type FieldErrors<T>= {
    [K in keyof T]? : string[]
} 

export type ActionState<TInput, TOutput> = {
    fieldErrors?: FieldErrors<TInput>,
    error?: string | null
    data?: TOutput
}

export const createSafeAction = <TInput, TOutput>(
    schema: z.Schema<TInput>,
    handler: (validatedData: TInput) => Promise<ActionState<TInput, TOutput>>
)=>{
    return async (data: TInput):Promise<ActionState<TInput, TOutput>> => {
        const {success, data:validationData, error} = schema.safeParse(data)

        if(!success){
            return {
                fieldErrors: error.flatten().fieldErrors as FieldErrors<TInput>
            }
        }

        return handler(validationData)
    }
}