interface MentionBase {
  type: 'date' | string
}

export interface MentionDate extends MentionBase {
  type: 'date'
  date: {
    start: Date | string
    end: Date | string | null
  }
}
