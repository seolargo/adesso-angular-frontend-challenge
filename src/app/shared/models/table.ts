export interface Cost {
  resource: keyof ResourceState,
  disabled: boolean,
  value: number
}

export interface ResourceState {
  Wood: Resource;
  Food: Resource;
  Gold: Resource;
}

export interface Resource {
  disabled: boolean;
  value: number;
}
