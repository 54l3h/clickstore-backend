import { FilterQuery, Model, PopulateOptions, ProjectionType } from 'mongoose';

interface IFoundOneOptions<TDocument> {
  filters: FilterQuery<TDocument>;
  select?: ProjectionType<TDocument>;
  populateArray?: PopulateOptions[];
}

interface IFoundManyOptions<TDocument> {
  filters?: FilterQuery<TDocument>;
  select?: ProjectionType<TDocument>;
  populateArray?: PopulateOptions[];
}

export abstract class DatabaseService<TDocument> {
  constructor(private readonly model: Model<TDocument>) {}

  async create(document: Partial<TDocument>): Promise<TDocument> {
    return await this.model.create(document);
  }

  async findOne({
    filters,
    select = '',
    populateArray = [],
  }: IFoundOneOptions<TDocument>): Promise<TDocument | null> {
    return await this.model.findOne(filters, select).populate(populateArray);
  }

  async find({
    filters = {},
    select = '',
    populateArray = [],
  }: IFoundManyOptions<TDocument>): Promise<TDocument[] | null> {
    return await this.model.find(filters, select).populate(populateArray);
  }
}
