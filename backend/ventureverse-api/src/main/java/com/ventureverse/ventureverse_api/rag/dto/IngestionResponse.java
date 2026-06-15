package com.ventureverse.ventureverse_api.rag.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IngestionResponse {

    private Integer filesProcessed;

    private Integer chunksCreated;

    private String message;
}